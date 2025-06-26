import { HttpStatus, Injectable, Type } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './schema/venta.schema';
import { Model, PipelineStage, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { flagE } from 'src/core/enum/FlagEnum';
import { SeguimientoService } from 'src/seguimiento/seguimiento.service';
import { convertirHorasADiasYMinutos, diferencia } from 'src/core/util/tiempos';
import { ListarSeguimientoI } from 'src/seguimiento/interface/listarSeguimiento';
import { PaginadorDto } from 'src/core/dto/paginadorDto';
import { TiempoProduccionService } from 'src/tiempo-produccion/tiempo-produccion.service';
import { RangoService } from 'src/rango/rango.service';
import { TratamientoService } from 'src/tratamiento/tratamiento.service';
import { Seguimiento } from 'src/seguimiento/schema/seguimiento.schema';
import { estadoLenteE } from 'src/tiempo-produccion/enum/estadoLente';
import { skip } from 'src/core/util/skip';
import { paginas } from 'src/core/util/paginas';
import { VentasAggregateI } from './interface/ventasInterface';
import { MarcaService } from 'src/marca/marca.service';
import { TipoLenteService } from 'src/tipo-lente/tipoLente.service';
import { ColorLenteService } from 'src/color-lente/colorLente.service';
import { MaterialService } from 'src/material/material.service';
import { TipoColorService } from 'src/tipo-color/tipoColor.service';
import { CombinacionReceta } from 'src/combinacion-receta/schema/combinacion-receta.schema';
import { CombinacionRecetaService } from 'src/combinacion-receta/combinacion-receta.service';
import { combinacionReceta } from 'src/combinacion-receta/interface/combinacionReceta';
import { CombinacionTiempoService } from 'src/combinacion-tiempo/combinacion-tiempo.service';
import { CombinacionTiempoI } from 'src/combinacion-tiempo/interface/combinacionTiempo';
import { estadoAntireflejoE } from 'src/tiempo-produccion/enum/estadoAntireflejo';
import { estadProcesoE } from 'src/tiempo-produccion/enum/estadoProceso';
import { TipoLenteE } from 'src/combinacion-tiempo/enum/tipoLente';
import { RangoTipoE } from 'src/core/enum/rangoE';

@Injectable()
export class VentaService {
  constructor(
    @InjectModel(Venta.name) private readonly venta: Model<Venta>,
    private readonly seguimientoService: SeguimientoService,
    private readonly tiempoProduccionService: TiempoProduccionService,

    private readonly rangoService: RangoService,
    private readonly tratamientoService: TratamientoService,
    private readonly combinacionRecetaService: CombinacionRecetaService,
    private readonly combinacionTiempoService: CombinacionTiempoService,
    /*  private readonly marcaService: MarcaService,
    private readonly colorLenteService: ColorLenteService,
    private readonly tipoLenteService: TipoLenteService,
    private readonly materialService: MaterialService,
    private readonly tipoColorService: TipoColorService,*/
  ) {}
  registrarVenta(crearVentaI: CreateVentaDto) {
    return this.venta.create(crearVentaI);
  }

  async verificarVentaExiste(pedido: string) {
    const venta = await this.venta.exists({
      flag: flagE.nuevo,
      pedido: pedido,
    });
    return venta;
  }

  async tiemposEntrega(paginadorDto: PaginadorDto) {
    const ventaData = [];

    const pipeline: PipelineStage[] = [
      { $match: { flag: flagE.nuevo } },
      {
        $lookup: {
          from: 'Sucursal',
          foreignField: '_id',
          localField: 'sucursal',
          as: 'sucursal',
        },
      },
      {
        $unwind: { path: '$sucursal', preserveNullAndEmptyArrays: false },
      },
      {
        $project: {
          estado: 1,
          pedido: 1,
          codigo: 1,
          descripcion: 1,
          fechaVenta: 1,
          combinacionReceta: 1,
          descripcionCombinacion: 1,
          sucursal: '$sucursal.nombre',
        },
      },
      {
        $skip: skip(paginadorDto.pagina, paginadorDto.limite),
      },
      {
        $limit: paginadorDto.limite,
      },
    ];

    const [ventas, countDocuments] = await Promise.all([
      this.venta.aggregate(pipeline),
      this.venta.countDocuments(),
    ]);

    for (const venta of ventas as VentasAggregateI[]) {
      const seguimiento = await this.seguimientoService.seguimientoVenta(
        venta._id,
      );

      seguimiento.sort(
        (a, b) => a.fechaTracking.getTime() - b.fechaTracking.getTime(),
      );
      console.log(venta.pedido);
      
      const tiempoTranscurridoTransporte =
        this.obtenerTiempoTransporte(seguimiento);
      const obtenerTiemposDeTracking =
        this.obtenerTiemposDeTracking(seguimiento);
      const entregaLaboratorio =
        this.obtenerTiemposEntregaLaboratorio(seguimiento);

      const tiempoPrometido = await this.obtenerTiempoPrometido(
        venta.combinacionReceta,
        venta.sucursal,
      );

      const data = {
        estado: venta.estado,
        fechaVenta: venta.fechaVenta,
        pedido: venta.pedido,
        producto: venta.codigo,
        descripcion: venta.descripcionCombinacion,
        timpoTranscurrido: obtenerTiemposDeTracking,
        entregaLaboratorio: entregaLaboratorio,
        timpoTranscurridoTransporte: tiempoTranscurridoTransporte,
        seguimiento: seguimiento,
        tiempoPrometido,
      };

      ventaData.push(data);
    }

    return {
      status: HttpStatus.OK,
      paginas: paginas(countDocuments, paginadorDto.limite),
      data: ventaData,
    };
  }

  private obtenerTiempoTransporte(seguimientos: ListarSeguimientoI[]) {
    let tiempoTranscurridoTransporte: string;
    let fechaDespacho: Date;
    let fechaEntrega: Date;
    for (const seguimiento of seguimientos) {
      if (seguimiento.tracking == 'Despachado') {
        fechaDespacho = seguimiento.fechaTracking;
      }

      if (seguimiento.tracking == 'Entregado Sucursal/Cliente') {
        fechaEntrega = seguimiento.fechaTracking;
      }
    }
    //console.log('tiempo transporte', fechaDespacho ,'', fechaEntrega);

    if (fechaDespacho && fechaEntrega) {
      const { dias, horasRestantes, minutosRestantes, totalHoras } = diferencia(
        fechaDespacho,
        fechaEntrega,
      );
      tiempoTranscurridoTransporte =
        dias > 0
          ? `${dias} dia(s) ${horasRestantes}h`
          : `${totalHoras}h ${minutosRestantes}m`;
    }

    return tiempoTranscurridoTransporte;
  }

  private obtenerTiemposDeTracking(seguimiento: ListarSeguimientoI[]) {
    const fechaInicio = seguimiento[0].fechaTracking;
    const fechaFin = seguimiento[seguimiento.length - 1].fechaTracking;
    const { dias, horasRestantes, minutosRestantes, totalHoras } = diferencia(
      fechaInicio,
      fechaFin,
    );
    return dias > 0
      ? `${dias} dia(s) ${horasRestantes}h ${minutosRestantes}m`
      : `${totalHoras}h ${minutosRestantes}m`;
  }

  private obtenerTiemposEntregaLaboratorio(seguimientos: ListarSeguimientoI[]) {
    let fechaEnvio: Date;

    let fechaDespacho: Date;
    let contador: number = 0;

    for (const seguimiento of seguimientos) {
      contador++;
      if (seguimiento.tracking == 'Envío Pedido') {
        fechaEnvio = seguimiento.fechaTracking;
      }
      if (seguimiento.tracking == 'Despachado') {
        fechaDespacho = seguimiento.fechaTracking;
      }

      if (!fechaDespacho && seguimientos.length > 0) {
        fechaDespacho = seguimientos[seguimientos.length - 1].fechaTracking;
      }
    }
    const { dias, horasRestantes, minutosRestantes, totalHoras } = diferencia(
      fechaEnvio,
      fechaDespacho,
    );
    return dias > 0
      ? `${dias} dia(s) ${horasRestantes}h ${minutosRestantes}m`
      : `${totalHoras}h ${minutosRestantes}m `;
  }

  private async obtenerTiempoPrometido(
    combinacion: Types.ObjectId,
    sucursal: string,
  ) {
    let resultado: string;

    const comb = await this.combinacionRecetaService.buscarReceta(combinacion);

    if (comb) {
      const data: CombinacionTiempoI = {
        tipoColor: comb.tipoColorLente,
        tipoLente:
          comb.tipoLente === TipoLenteE.visionSencilla
            ? comb.tipoLente
            : TipoLenteE.cualquierLente,
        tratamiento: comb.tratamiento,
      };

      const [tiemposCombinacion, tratamiento, rango] = await Promise.all([
        this.combinacionTiempoService.buscarCombiancionTiempo(data),
        this.tratamientoService.findOne(comb.tratamiento),
        this.rangoService.findOne(comb.rango)
      
      ]);


      
      if (tiemposCombinacion && tratamiento.nombre != 'SIN TRATAMIENTO') {
        resultado = await this.tiempoPrometido(
          tiemposCombinacion._id,
          estadoAntireflejoE.conAntireflejo,
          rango.tipo
        );
      }
      if (tiemposCombinacion && tratamiento.nombre == 'SIN TRATAMIENTO') {
        resultado = await this.tiempoPrometido(
          tiemposCombinacion._id,
          estadoAntireflejoE.sinAntireflejo,
          rango.tipo
        );
      }
      return resultado;
    }
  }

  private async tiempoPrometido(
    combinacion: Types.ObjectId,
    estadoAntireflejoE: estadoAntireflejoE,
    tipo:RangoTipoE
  ) {
    let resultado: number = 0;
    const tiempo =
      await this.tiempoProduccionService.tiempoProduccionPorCombinacionTiempo(
        combinacion,
        estadoAntireflejoE,
        tipo

      );
      console.log(tipo);
      
    console.log(tiempo);
    
    if (tiempo) {
      resultado =
        tiempo.recepcion +
        tiempo.almacen +
        tiempo.calculo +
        tiempo.digital +
        tiempo.antireflejo +
        tiempo.bisel +
        tiempo.tinte +
        tiempo.despacho +
        tiempo.controlCalidad +
        tiempo.tiempoLogisticaEntrega;
    }
    const { dias, horasRestantes, minutosRestantes, totalHoras } =
      convertirHorasADiasYMinutos(resultado);
    return dias > 0
      ? `${dias} dia(s) ${horasRestantes}h ${minutosRestantes}m`
      : `${totalHoras}h ${minutosRestantes}m `;
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }
}
