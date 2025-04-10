import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/createTratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tratamiento } from './schema/tratamiento.schema';
import { Model } from 'mongoose';

@Injectable()
export class TratamientoService {
  constructor(@InjectModel(Tratamiento.name) private readonly tratamiento:Model<Tratamiento>){}
  async create(createTratamientoDto: CreateTratamientoDto) {
    for (const data of createTratamientoDto.data) {
      const tratamiento = await this.tratamiento.findOne({nombre:data.nombre})
      if(!tratamiento) {
        await this.tratamiento.create(data)
      }
    }
    return {status:HttpStatus.CREATED};
  }

  findAll() {
    return `This action returns all tratamiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tratamiento`;
  }

  update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
    return `This action updates a #${id} tratamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tratamiento`;
  }
}
