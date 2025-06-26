import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTiempoProduccionDto } from './dto/createtiempoProduccion.dto';
import { UpdateTiempoProduccionDto } from './dto/update-tiempo-produccion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TiempoProduccion } from './schema/tiempoProduccion.schema';
import { Model, Types } from 'mongoose';
import { RangoTipoE } from 'src/core/enum/rangoE';

@Injectable()
export class TiempoProduccionService {
  constructor(@InjectModel(TiempoProduccion.name) private readonly tiempoProduccion:Model<TiempoProduccion>){}
  create(createTiempoProduccionDto: CreateTiempoProduccionDto) {
    createTiempoProduccionDto.combinacionTiempo = new Types.ObjectId(createTiempoProduccionDto.combinacionTiempo)
    createTiempoProduccionDto.sucursal = new Types.ObjectId(createTiempoProduccionDto.sucursal)
    this.tiempoProduccion.create(createTiempoProduccionDto)
    return {status:HttpStatus.CREATED};
  }

  async findAll() {
    const resultado = await this.tiempoProduccion.aggregate([
      {
        $lookup:{
          from:'CombinacionTiempo',
          foreignField:'_id',
          localField:'combinacionTiempo',
          as:'combinacionTiempo'
        }
      },
      {
        $unwind:{path:'$combinacionTiempo', preserveNullAndEmptyArrays:false}
      },
     
        {
        $lookup:{
          from:'TipoColor',
          localField:'combinacionTiempo.tipoColor',
          foreignField:'_id',
          as:'tipoColor'
        }
      },
       {
        $unwind:{path:'$tipoColor', preserveNullAndEmptyArrays:false}
      },
        {
        $lookup:{
          from:'Tratamiento',
          localField:'combinacionTiempo.tratamiento',
          foreignField:'_id',
          as:'tratamiento'
        }
      },
       {
        $unwind:{path:'$tratamiento', preserveNullAndEmptyArrays:false}
      },

        {
        $lookup:{
          from:'Sucursal',
          localField:'sucursal',
          foreignField:'_id',
          as:'sucursal'
        }
      },
       {
        $unwind:{path:'$sucursal', preserveNullAndEmptyArrays:false}
      },
      {
        $project:{
          recepcion:1,
          almacen:1,
          calculo:1,
          digital:1,
          antireflejo:1,
          bisel:1,
          tinte:1,
          despacho:1,
          controlCalidad:1,
          tiempoLogisticaEntrega:1,
          estadoAntireflejo:1,
          estadoLente:1,
          estadoProeceso:1,
          tipo:1,
          tipoLente:'$combinacionTiempo.tipoLente',
          tipoColor:'$tipoColor.nombre',
          tratamiento:'$tratamiento.nombre',
          sucursal:'$sucursal.nombre'
        }
      }
    ])
    console.log(resultado);
    
    return resultado;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiempoProduccion`;
  }

  update(id: number, updateTiempoProduccionDto: UpdateTiempoProduccionDto) {
    return `This action updates a #${id} tiempoProduccion`;
  }



 async tiempoProduccionPorSucursal(sucursal:Types.ObjectId) {
    const tiempo = await this.tiempoProduccion.find({sucursal:new Types.ObjectId(sucursal)})
    return tiempo
   }

    async tiempoProduccionPorCombinacionTiempo(combinacionTiempo:Types.ObjectId, estadoAntireflejo:string, tipo:RangoTipoE) {
    const tiempo = await this.tiempoProduccion.findOne({combinacionTiempo:new Types.ObjectId(combinacionTiempo), estadoAntireflejo:estadoAntireflejo, tipo:tipo})
    return tiempo
   }


}
