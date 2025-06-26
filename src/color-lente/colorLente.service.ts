import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateColorLenteDto } from './dto/createColorLente.dto';
import { UpdateColorLenteDto } from './dto/updateColorLente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ColorLente } from './schema/colorLente.schema';
import { Model } from 'mongoose';

@Injectable()
export class ColorLenteService {
  constructor(
    @InjectModel(ColorLente.name)
    private readonly colorLente: Model<ColorLente>,
  ) {}
  async create(createColorLenteDto: CreateColorLenteDto) {
    for (const data of createColorLenteDto.data) {
      const colorLente = await this.colorLente.findOne({ nombre: data.nombre });
      if (!colorLente) {
        await this.colorLente.create(data);
      }
    }
    return { status: HttpStatus.CREATED };
  }

  async verificarColorLente(nombre: string) {
    const colorLente = await this.colorLente.findOne({
      nombre: nombre.toUpperCase(),
    });
    return colorLente;
  }

  async registarColorLente(nombre: string, abreviaturaNovar: string) {
    const colorLente = await this.colorLente.findOne({ nombre: nombre });
    if (!colorLente) {
      return await this.colorLente.create({
        nombre: nombre,
        abreviaturaNovar: abreviaturaNovar,
      });
    }
    return colorLente;
  }

  
  findAll() {
    return `This action returns all colorLente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colorLente`;
  }

  update(id: number, updateColorLenteDto: UpdateColorLenteDto) {
    return `This action updates a #${id} colorLente`;
  }

  remove(id: number) {
    return `This action removes a #${id} colorLente`;
  }
}
