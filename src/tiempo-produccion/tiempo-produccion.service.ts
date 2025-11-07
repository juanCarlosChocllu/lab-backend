import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTiempoProduccionDto } from './dto/createtiempoProduccion.dto';
import { UpdateTiempoProduccionDto } from './dto/update-tiempo-produccion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TiempoProduccion } from './schema/tiempoProduccion.schema';
import { Model, Types, PipelineStage } from 'mongoose';
import { RangoTipoE } from 'src/core/enum/rangoE';
import { PaginadorDto } from 'src/core/dto/paginadorDto';
import { skip } from 'src/core/util/skip';
import { flagE } from 'src/core/enum/FlagEnum';
import { paginas } from 'src/core/util/paginas';
import { BuscadorTiempoProduccionDto } from './dto/BuscadorTiempoProduccion';

@Injectable()
export class TiempoProduccionService {
  constructor(
    @InjectModel(TiempoProduccion.name)
    private readonly tiempoProduccion: Model<TiempoProduccion>,
  ) {}
  async create(createTiempoProduccionDto: CreateTiempoProduccionDto) {
    createTiempoProduccionDto.combinacionTiempo = new Types.ObjectId(
      createTiempoProduccionDto.combinacionTiempo,
    );
    createTiempoProduccionDto.sucursal = new Types.ObjectId(
      createTiempoProduccionDto.sucursal,
    );
    const tiempoProduccion = await this.tiempoProduccion.findOne({
      sucursal: createTiempoProduccionDto.sucursal,
      combinacionTiempo: createTiempoProduccionDto.combinacionTiempo,
      tipo: createTiempoProduccionDto.tipo,
      estadoAntireflejo: createTiempoProduccionDto.estadoAntireflejo,
      estadoProeceso: createTiempoProduccionDto.estadoProeceso,
    });
    if (!tiempoProduccion) {
      await this.tiempoProduccion.create(createTiempoProduccionDto);
      return { status: HttpStatus.CREATED };
    }
    return { status: HttpStatus.CREATED };
  }

  async findAll(BuscadorTiempoProduccionDto: BuscadorTiempoProduccionDto) {
    const filter = {}
    if(BuscadorTiempoProduccionDto.recepcion){
      filter['recepcion'] = BuscadorTiempoProduccionDto.recepcion
    }
    if(BuscadorTiempoProduccionDto.almacen){
      filter['almacen'] = BuscadorTiempoProduccionDto.almacen
    }
     if(BuscadorTiempoProduccionDto.calculo){
      filter['calculo'] = BuscadorTiempoProduccionDto.calculo
    }

    if(BuscadorTiempoProduccionDto.digital){
      filter['digital'] = BuscadorTiempoProduccionDto.digital
    }
     if(BuscadorTiempoProduccionDto.antireflejo){
      filter['antireflejo'] = BuscadorTiempoProduccionDto.antireflejo
    }
     if(BuscadorTiempoProduccionDto.esperaMontura){
      filter['esperaMontura'] = BuscadorTiempoProduccionDto.esperaMontura
    }
     if(BuscadorTiempoProduccionDto.bisel){
      filter['bisel'] = BuscadorTiempoProduccionDto.bisel
    }
     if(BuscadorTiempoProduccionDto.tinte){
      filter['tinte'] = BuscadorTiempoProduccionDto.tinte
    }
    if(BuscadorTiempoProduccionDto.controlCalidad){
      filter['controlCalidad'] = BuscadorTiempoProduccionDto.controlCalidad
    }
    if(BuscadorTiempoProduccionDto.despacho){
      filter['despacho'] = BuscadorTiempoProduccionDto.despacho
    }

    if(BuscadorTiempoProduccionDto.tiempoLogisticaEntrega){
      filter['tiempoLogisticaEntrega'] = BuscadorTiempoProduccionDto.tiempoLogisticaEntrega
    }
    if(BuscadorTiempoProduccionDto.tiempoTransporte){
      filter['tiempoTransporte'] = BuscadorTiempoProduccionDto.tiempoTransporte
    }
     if(BuscadorTiempoProduccionDto.estadoAntireflejo){
      filter['estadoAntireflejo'] =new RegExp( BuscadorTiempoProduccionDto.estadoAntireflejo, 'i')
    }
     if(BuscadorTiempoProduccionDto.estadoLente){
      filter['estadoLente'] =new RegExp( BuscadorTiempoProduccionDto.estadoLente, 'i')
    }
    if(BuscadorTiempoProduccionDto.estadoProeceso){
      filter['estadoProeceso'] =new RegExp( BuscadorTiempoProduccionDto.estadoProeceso, 'i')
    }
     if(BuscadorTiempoProduccionDto.tipo){
      filter['tipo'] =new RegExp( BuscadorTiempoProduccionDto.tipo, 'i')
    }
  
    
    const pipeline: PipelineStage[] = [
      {
        $match : filter
      },
      {
        $skip: skip(
          BuscadorTiempoProduccionDto.pagina,
          BuscadorTiempoProduccionDto.limite,
        ),
      },
      {
        $limit: BuscadorTiempoProduccionDto.limite,
      },
      {
        $lookup: {
          from: 'CombinacionTiempo',
          foreignField: '_id',
          localField: 'combinacionTiempo',
          as: 'combinacionTiempo',
        },
      },
      {
        $unwind: {
          path: '$combinacionTiempo',
          preserveNullAndEmptyArrays: false,
        },
      },
      ...(BuscadorTiempoProduccionDto.tipoLente
        ? [
            {
              $match: {
                'combinacionTiempo.tipoLente': new RegExp(
                  BuscadorTiempoProduccionDto.tipoLente,
                  'i',
                ),
              },
            },
          ]
        : []),
      {
        $lookup: {
          from: 'TipoColor',
          localField: 'combinacionTiempo.tipoColor',
          foreignField: '_id',
          as: 'tipoColor',
        },
      },
      {
        $unwind: { path: '$tipoColor', preserveNullAndEmptyArrays: false },
      },
      ...(BuscadorTiempoProduccionDto.tipoColor
        ? [
            {
              $match: {
                'tipoColor.nombre': new RegExp(
                  BuscadorTiempoProduccionDto.tipoColor,
                  'i',
                ),
              },
            },
          ]
        : []),
      {
        $lookup: {
          from: 'Tratamiento',
          localField: 'combinacionTiempo.tratamiento',
          foreignField: '_id',
          as: 'tratamiento',
        },
      },
      {
        $unwind: { path: '$tratamiento', preserveNullAndEmptyArrays: false },
      },
      ...(BuscadorTiempoProduccionDto.tratamiento
        ? [
            {
              $match: {
                'tratamiento.nombre': new RegExp(
                  BuscadorTiempoProduccionDto.tratamiento,
                  'i',
                ),
              },
            },
          ]
        : []),
      {
        $lookup: {
          from: 'Sucursal',
          localField: 'sucursal',
          foreignField: '_id',
          as: 'sucursal',
        },
      },
      {
        $unwind: { path: '$sucursal', preserveNullAndEmptyArrays: false },
      },
      ...(BuscadorTiempoProduccionDto.sucursal
        ? [
            {
              $match: {
                'sucursal.nombre': new RegExp(
                  BuscadorTiempoProduccionDto.sucursal,
                  'i',
                ),
              },
            },
          ]
        : []),
      {
        $project: {
          recepcion: 1,
          almacen: 1,
          calculo: 1,
          digital: 1,
          antireflejo: 1,
          bisel: 1,
          tinte: 1,
          despacho: 1,
          controlCalidad: 1,
          tiempoLogisticaEntrega: 1,
          estadoAntireflejo: 1,
          estadoLente: 1,
          estadoProeceso: 1,
          tiempoTransporte: 1,
          tipo: 1,
          esperaMontura: 1,
          tipoLente: '$combinacionTiempo.tipoLente',
          tipoColor: '$tipoColor.nombre',
          tratamiento: '$tratamiento.nombre',
          sucursal: '$sucursal.nombre',
        },
      },
    ];
    const [resultado, countDocuments] = await Promise.all([
      this.tiempoProduccion.aggregate(pipeline),
      this.tiempoProduccion.countDocuments({ flag: flagE.nuevo }),
    ]);
    const cantidadPaginas = paginas(
      countDocuments,
      BuscadorTiempoProduccionDto.limite,
    );

    return { data: resultado, paginas: cantidadPaginas };
  }

  findOne(id: number) {
    return `This action returns a #${id} tiempoProduccion`;
  }

  update(id: number, updateTiempoProduccionDto: UpdateTiempoProduccionDto) {
    return `This action updates a #${id} tiempoProduccion`;
  }

  async tiempoProduccionPorSucursal(sucursal: Types.ObjectId) {
    const tiempo = await this.tiempoProduccion.find({
      sucursal: new Types.ObjectId(sucursal),
    });
    return tiempo;
  }

  async tiempoProduccionPorCombinacionTiempo(
    combinacionTiempo: Types.ObjectId,
    tipo: RangoTipoE,
    sucursal: Types.ObjectId,
    antireflejo: string,
    estadoProeceso: string,
    estadoLente: string,
  ) {    
    const tiempo = await this.tiempoProduccion.findOne({
      combinacionTiempo: new Types.ObjectId(combinacionTiempo),
      tipo: tipo,
      sucursal: new Types.ObjectId(sucursal),
      estadoProeceso: estadoProeceso,
      estadoLente: estadoLente,
      estadoAntireflejo: antireflejo,
    });
    return tiempo;
  }


 /* async tiempoProduccionPorCombinacionTiempo(
    combinacionTiempo: Types.ObjectId,
    tipo: RangoTipoE,
    sucursal: Types.ObjectId,
    estadoLente:string
  ) {
    const tiempo = await this.tiempoProduccion.findOne({
      combinacionTiempo: new Types.ObjectId(combinacionTiempo),
      tipo: tipo,
      sucursal: new Types.ObjectId(sucursal),
      estadoLente:estadoLente
    });
    return tiempo;
  }*/
}
