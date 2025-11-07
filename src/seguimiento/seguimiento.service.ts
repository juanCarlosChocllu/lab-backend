import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seguimiento } from './schema/seguimiento.schema';
import { Model, Types } from 'mongoose';
import { CrearSeguimiento } from './interface/crearSeguimiento';
import { flagE } from 'src/core/enum/FlagEnum';

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectModel(Seguimiento.name)
    private readonly seguimiento: Model<Seguimiento>,
  ) {}
  async crearSeguimiento(crearSeguimiento: CrearSeguimiento) {
    const seguimiento = await this.seguimiento.findOne({
      idTrackingActividad: crearSeguimiento.idTrackingActividad,
    });
    if (!seguimiento) {
      return this.seguimiento.create(crearSeguimiento);
    }
  }

  async seguimientoVenta(venta: Types.ObjectId) {
    const seguimiento = await this.seguimiento.find({
      flag: flagE.nuevo,
      venta: new Types.ObjectId(venta),
    });

    return seguimiento;
  }
}
