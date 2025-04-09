import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTiempoProduccionDto } from './dto/createtiempoProduccion.dto';
import { UpdateTiempoProduccionDto } from './dto/update-tiempo-produccion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TiempoProduccion } from './schema/tiempoProduccion.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TiempoProduccionService {
  constructor(@InjectModel(TiempoProduccion.name) private readonly tiempoProduccion:Model<TiempoProduccion>){}
  create(createTiempoProduccionDto: CreateTiempoProduccionDto) {
    createTiempoProduccionDto.detalleLente = new Types.ObjectId(createTiempoProduccionDto.detalleLente)
    this.tiempoProduccion.create(createTiempoProduccionDto)
    return {status:HttpStatus.CREATED};
  }

  findAll() {
    return `This action returns all tiempoProduccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiempoProduccion`;
  }

  update(id: number, updateTiempoProduccionDto: UpdateTiempoProduccionDto) {
    return `This action updates a #${id} tiempoProduccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiempoProduccion`;
  }
}
