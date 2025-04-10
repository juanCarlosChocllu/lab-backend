import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTipoColorDto } from './dto/createTipocolor.dto';
import { UpdateTipoColorDto } from './dto/update-tipo-color.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoColor } from './schema/tipoColor.schema';
import { Model } from 'mongoose';

@Injectable()
export class TipoColorService {
  constructor(@InjectModel(TipoColor.name) private readonly  tipoColor:Model<TipoColor>){}
  async  create(createTipoColorDto: CreateTipoColorDto) {
   for (const data of createTipoColorDto.data) {
      const tipoColor = await this.tipoColor.findOne({nombre:data.nombre})
      if(!tipoColor) {
        await this.tipoColor.create(data)
      }
   }  
   return {status:HttpStatus.CREATED}
  }

  findAll() {
    return `This action returns all tipoColor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoColor`;
  }

  update(id: number, updateTipoColorDto: UpdateTipoColorDto) {
    return `This action updates a #${id} tipoColor`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoColor`;
  }
}
