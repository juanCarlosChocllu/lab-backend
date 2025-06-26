import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/createMarca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Marca } from './schema/marca.schema';
import { Model } from 'mongoose';

@Injectable()
export class MarcaService {
  constructor(@InjectModel(Marca.name) private readonly marca:Model<Marca>){}
  async create(createMarcaDto: CreateMarcaDto) {
    for (const data of createMarcaDto.data) {
      const marca = await this.marca.findOne({nombre:data.nombre})
      if(!marca){
        await this.marca.create(data)
      }
    }
    return {status:HttpStatus.CREATED};
  }

  
  async verificarMarca(nombre:string){
    const marca = await this.marca.findOne({nombre:nombre.toUpperCase()})
    return marca
  }

    async registarMarcaLente(nombre: string, abreviaturaNovar: string) {
    const marca = await this.marca.findOne({ nombre: nombre });
    if (!marca) {
      return await this.marca.create({
        nombre: nombre,
        abreviaturaNovar: abreviaturaNovar,
      });
    }
    return marca;
  }

  findAll() {
    return `This action returns all marca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marca`;
  }

  update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return `This action updates a #${id} marca`;
  }

  remove(id: number) {
    return `This action removes a #${id} marca`;
  }
}
