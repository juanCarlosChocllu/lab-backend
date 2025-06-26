import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRangoDto } from './dto/createRango.dto';
import { UpdateRangoDto } from './dto/update-rango.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rango } from './schema/rango.schema';
import { Model, Types } from 'mongoose';
import { flagE } from 'src/core/enum/FlagEnum';
import { DataRangoDto } from './dto/dataRango.dto';
import { CrearRangoMia } from './dto/crearRangoMia.dto';
import { key } from 'src/core/config/variablesEntorno';

@Injectable()
export class RangoService {
  constructor(@InjectModel(Rango.name) private readonly rango: Model<Rango>) {}
  async create(createRangoDto: CreateRangoDto) {
    for (const data of createRangoDto.data) {
      const rango = await this.rango.findOne({ nombre: data.nombre });
      if (!rango) {
        await this.rango.create(data);
      }
    }
    return { status: HttpStatus.CREATED };
  }

  async registrarRangoMia(crearRangoMia: CrearRangoMia) {
    if(crearRangoMia.key === key){
      const rango = await this.rango.findOne({ nombre: crearRangoMia.nombre });
    if (!rango) {
      await this.rango.create(crearRangoMia);
    }
    await this.rango.updateOne(
      { nombre: crearRangoMia.nombre },
      {
        abreviaturaNovar: crearRangoMia.abreviaturaNovar,
        tipo: crearRangoMia.tipo,
      },  
    );
    return { status: HttpStatus.OK}
    }
    throw new ForbiddenException();
  }

  async listarRangoPorAbreviatura(abreviatura: string) {
    const rango = await this.rango.findOne({
      abreviaturaNovar: abreviatura.toUpperCase(),
    });
    return rango;
  }

  async verificarRango(nombre: string) {
    const rango = await this.rango.findOne({ nombre: nombre.toUpperCase() });
    return rango;
  }

  async registarRangoLente(nombre: string, abreviaturaNovar: string) {
    const rango = await this.rango.findOne({ nombre: nombre });
    if (!rango) {
      return await this.rango.create({
        nombre: nombre,
        abreviaturaNovar: abreviaturaNovar,
      });
    }
    return rango;
  }

  async findOne(id: Types.ObjectId) {
    return await this.rango.findOne({
      _id: new Types.ObjectId(id),
      flag: flagE.nuevo,
    });
  }

  update(id: number, updateRangoDto: UpdateRangoDto) {
    return `This action updates a #${id} rango`;
  }

  remove(id: number) {
    return `This action removes a #${id} rango`;
  }
}
