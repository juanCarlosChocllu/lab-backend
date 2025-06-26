import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCombinacionTiempoDto } from './dto/create-combinacion-tiempo.dto';
import { UpdateCombinacionTiempoDto } from './dto/update-combinacion-tiempo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CombinacionTiempo } from './schema/combinacionTiempo.schema';
import { Model, Types } from 'mongoose';
import { CombinacionTiempoI } from './interface/combinacionTiempo';
import { console } from 'inspector';

@Injectable()
export class CombinacionTiempoService {
  constructor(
    @InjectModel(CombinacionTiempo.name)
    private readonly combinacionTiempo: Model<CombinacionTiempo>,
  ) {}
  async create(createCombinacionTiempoDto: CreateCombinacionTiempoDto) {
    createCombinacionTiempoDto.tipoColor = new Types.ObjectId(
      createCombinacionTiempoDto.tipoColor,
    );
    createCombinacionTiempoDto.tratamiento = new Types.ObjectId(
      createCombinacionTiempoDto.tratamiento,
    );
    createCombinacionTiempoDto.tipoLente = createCombinacionTiempoDto.tipoLente;

    await this.combinacionTiempo.create(createCombinacionTiempoDto);
    return { status: HttpStatus.CREATED };
  }

  async listar() {
    const resultado = await this.combinacionTiempo.aggregate([
      {
        $lookup:{
          from:'TipoColor',
          foreignField:'_id',
          localField:'tipoColor',
          as:'tipoColor'
        }
      },
       {
        $lookup:{
          from:'Tratamiento',
          foreignField:'_id',
          localField:'tratamiento',
          as:'tratamiento'
        }
      },
      {
        $project:{
          tipoLente:1,
          tratamiento:{$arrayElemAt:['$tratamiento.nombre',0]},
          tipoColor:{$arrayElemAt:['$tipoColor.nombre',0]}
        }
      }
    ])
    return  resultado;
  }

  async buscarCombiancionTiempo(data: CombinacionTiempoI) {
    return await this.combinacionTiempo.findOne(data);
  }

  update(id: number, updateCombinacionTiempoDto: UpdateCombinacionTiempoDto) {
    return `This action updates a #${id} combinacionTiempo`;
  }

  remove(id: number) {
    return `This action removes a #${id} combinacionTiempo`;
  }
}
