import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/createTratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tratamiento } from './schema/tratamiento.schema';
import { Model, Types } from 'mongoose';
import { flagE } from 'src/core/enum/FlagEnum';

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

  async listarTratamientoPorAbreviatura(abreviatura:string){
  const tratamiento = await this.tratamiento.findOne({abreviaturaNovar:abreviatura.toUpperCase()})
  return tratamiento
}
async verificarTratamiento(nombre:string){
  const tratamiento = await this.tratamiento.findOne({nombre:nombre.toUpperCase()})
  return tratamiento
}


  async registarTratamientoLenteLente(nombre: string, abreviaturaNovar: string) {
    const tratamiento = await this.tratamiento.findOne({ nombre: nombre });
    if (!tratamiento) {
      return await this.tratamiento.create({
        nombre: nombre,
        abreviaturaNovar: abreviaturaNovar,
      });
    }
    return tratamiento;
  }

    async guardarTratamiento(nombre: string) {
    const tratamiento = await this.tratamiento.findOne({ nombre: nombre });
    if (!tratamiento) {
      return await this.tratamiento.create({
        nombre: nombre
      });
    }
    return tratamiento;
  }



 async listar() {
    const tratamiento = await this.tratamiento.find({ flag: flagE.nuevo });
    return tratamiento;
  }
  async findOne(id: Types.ObjectId) {
   const tratamiento = await this.tratamiento.findOne({_id:new Types.ObjectId(id)})
  return tratamiento
  }

  update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
    return `This action updates a #${id} tratamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tratamiento`;
  }
}
