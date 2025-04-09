import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetalleLenteDto } from './dto/createDetalleLente.dto';
import { UpdateDetalleLenteDto } from './dto/UpdateDetalleLente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DetalleLente } from './schema/detalleLente.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class DetalleLenteService {
  constructor(@InjectModel(DetalleLente.name) private readonly detalleLente:Model<DetalleLente>){}
  async create(createDetalleLenteDto: CreateDetalleLenteDto) {
    createDetalleLenteDto.tipoVision = new Types.ObjectId(createDetalleLenteDto.tipoVision)
    await this.detalleLente.create(createDetalleLenteDto)
    return {status:HttpStatus.CREATED};
  }

  findAll() {
    return `This action returns all detalleLente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleLente`;
  }

  update(id: number, updateDetalleLenteDto: UpdateDetalleLenteDto) {
    return `This action updates a #${id} detalleLente`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleLente`;
  }
}
