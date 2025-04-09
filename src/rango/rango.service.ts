import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRangoDto } from './dto/createRango.dto';
import { UpdateRangoDto } from './dto/update-rango.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rango } from './schema/rango.schema';
import { Model } from 'mongoose';

@Injectable()
export class RangoService {
  constructor(@InjectModel(Rango.name) private readonly  rango:Model<Rango>){}
  async create(createRangoDto: CreateRangoDto) {
    for (const data of createRangoDto.data) {
        await this.rango.create(data)
    }
    return {status:HttpStatus.CREATED};
  }

  findAll() {
    return `This action returns all rango`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rango`;
  }

  update(id: number, updateRangoDto: UpdateRangoDto) {
    return `This action updates a #${id} rango`;
  }

  remove(id: number) {
    return `This action removes a #${id} rango`;
  }
}
