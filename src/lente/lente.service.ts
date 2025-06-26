import { Injectable } from '@nestjs/common';
import { CreateLenteDto } from './dto/create-lente.dto';
import { UpdateLenteDto } from './dto/update-lente.dto';
import { LenteVentaI } from './interface/lenteInterface';
import { Lente } from './schema/lente.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class LenteService {
  constructor(@InjectModel(Lente.name) private readonly lente:Model<Lente>){}
  create(createLenteDto: CreateLenteDto) {
    return 'This action adds a new lente';
  }

  async registrarLente(data:LenteVentaI){
    
    
    data.venta = new Types.ObjectId(data.venta)
    const lente = await this.lente.findOne({nombre:data.nombre, venta:data.venta})
    if(!lente){
          await this.lente.create(data)
    }


  }

  findAll() {
    return `This action returns all lente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lente`;
  }

  update(id: number, updateLenteDto: UpdateLenteDto) {
    return `This action updates a #${id} lente`;
  }

  remove(id: number) {
    return `This action removes a #${id} lente`;
  }
}
