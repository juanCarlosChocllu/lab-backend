import { Injectable } from '@nestjs/common';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Seguimiento } from './schema/seguimiento.schema';
import { Model, Types } from 'mongoose';
import { CrearSeguimiento } from './interface/crearSeguimiento';
import { flagE } from 'src/core/enum/FlagEnum';

@Injectable()
export class SeguimientoService {
  constructor(@InjectModel(Seguimiento.name) private readonly seguimiento:Model<Seguimiento>){}
  async crearSeguimiento(crearSeguimiento: CrearSeguimiento) {
    const seguimiento = await this.seguimiento.findOne({venta:new Types.ObjectId(crearSeguimiento.venta),fechaTracking: crearSeguimiento.fechaTracking , tracking:crearSeguimiento.tracking, sector:crearSeguimiento.sector})    
    if(!seguimiento){
      return this.seguimiento.create(crearSeguimiento);
    }

  }

 async  seguimientoVenta(venta:Types.ObjectId) {
    const seguimiento = await this.seguimiento.find({flag:flagE.nuevo, venta:new Types.ObjectId(venta)})

    return seguimiento;
  }

  findOne(id: number) {
    return `This action returns a #${id} seguimiento`;
  }

  update(id: number, updateSeguimientoDto: UpdateSeguimientoDto) {
    return `This action updates a #${id} seguimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} seguimiento`;
  }
}
