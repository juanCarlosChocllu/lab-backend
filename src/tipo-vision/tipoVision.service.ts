import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTipoVisionDto } from './dto/create-tipo-vision.dto';
import { UpdateTipoVisionDto } from './dto/update-tipo-vision.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoVision } from './schema/tipoVision.schema';
import { Model } from 'mongoose';

@Injectable()
export class TipoVisionService {
  constructor(@InjectModel(TipoVision.name) private readonly tipoVision:Model<TipoVision> ){}
  async create(createTipoVisionDto: CreateTipoVisionDto) {
    const tipoVision = await this.tipoVision.findOne({nombre:createTipoVisionDto.nombre})
    if(tipoVision){
      throw  new ConflictException();
    }
    await this.tipoVision.create(createTipoVisionDto)
    return {status:HttpStatus.CREATED} ;
  }

  findAll() {
    return `This action returns all tipoVision`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoVision`;
  }

  update(id: number, updateTipoVisionDto: UpdateTipoVisionDto) {
    return `This action updates a #${id} tipoVision`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoVision`;
  }
}
