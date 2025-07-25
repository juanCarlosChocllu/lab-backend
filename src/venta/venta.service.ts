import { HttpStatus, Injectable } from '@nestjs/common';
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

import { skip } from 'src/core/util/skip';
import { paginas } from 'src/core/util/paginas';
import { VentasAggregateI } from './interface/ventasInterface';

import { CombinacionRecetaService } from 'src/combinacion-receta/combinacion-receta.service';

import { CombinacionTiempoService } from 'src/combinacion-tiempo/combinacion-tiempo.service';
import { CombinacionTiempoI } from 'src/combinacion-tiempo/interface/combinacionTiempo';
import { estadoAntireflejoE } from 'src/tiempo-produccion/enum/estadoAntireflejo';

import { TipoLenteE } from 'src/combinacion-tiempo/enum/tipoLente';
import { RangoTipoE } from 'src/core/enum/rangoE';
import { BuscadorDto } from './dto/buscadorDto';

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



  async tiemposEntrega(buscadorDto: BuscadorDto) {
    const ventaData = [];
    const filter = {
      flag: flagE.nuevo,
      sucursal: {
        $in: buscadorDto.sucursal.map((item) => new Types.ObjectId(item)),
      },
      fechaVenta:{
       $gte :new Date( new Date(buscadorDto.fechaInicio).setUTCHours(0,0,0,0)),
       $lte :new Date( new Date(buscadorDto.fechaFin).setUTCHours(23,59,59,999)),
      }
      
    };
    console.log(filter);
    
    const pipeline: PipelineStage[] = [
      { $match: filter },

      {
        $project: {
          estado: 1,
          pedido: 1,
          codigo: 1,
          descripcion: 1,
          fechaVenta: 1,
          combinacionReceta: 1,
          descripcionCombinacion: 1,
          sucursal: 1,
          id_venta: 1,
        },
      },
    
    ];

    const ventas= await this.venta.aggregate(pipeline)

    for (const venta of ventas as VentasAggregateI[]) {
      const seguimiento = await this.seguimientoService.seguimientoVenta(
        venta._id,
      );
      seguimiento.sort(
        (a, b) => a.fechaTracking.getTime() - b.fechaTracking.getTime(),
      );
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
        producto: venta.id_venta,
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
    sucursal: Types.ObjectId,
  ) {
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

      const [tiemposCombinacion, rango] = await Promise.all([
        this.combinacionTiempoService.buscarCombiancionTiempo(data),
        this.rangoService.findOne(comb.rango),
      ]);
      if (tiemposCombinacion) {
        const resultado: string = await this.tiempoPrometido(
          tiemposCombinacion._id,
          rango.tipo,
          sucursal,
        );

        return resultado;
      }
    }
  }

  private async tiempoPrometido(
    combinacion: Types.ObjectId,
    tipo: RangoTipoE,
    sucursal: Types.ObjectId,
  ) {
    let resultado: number = 0;
    const tiempo =
      await this.tiempoProduccionService.tiempoProduccionPorCombinacionTiempo(
        combinacion,
        tipo,
        sucursal,
      );

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
        tiempo.tiempoTransporte +
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
