import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTipoColorDto } from './dto/createTipocolor.dto';
import { UpdateTipoColorDto } from './dto/update-tipo-color.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoColor } from './schema/tipoColor.schema';
import { Model } from 'mongoose';
import { flagE } from 'src/core/enum/FlagEnum';

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

  async verificarTipoColor(nombre:string){
    const tipoColor = await this.tipoColor.findOne({nombre:nombre.toUpperCase()})
    return tipoColor
  }

    async registarTipoColorLente(nombre: string, abreviaturaNovar: string) {
    const tipoColor = await this.tipoColor.findOne({ nombre: nombre });
    if (!tipoColor) {
      return await this.tipoColor.create({
        nombre: nombre,
        abreviaturaNovar: abreviaturaNovar,
      });
    }
    return tipoColor;
  }

  async listar() {
    const tipoLente = await this.tipoColor.find({ flag: flagE.nuevo });
    return tipoLente;
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
