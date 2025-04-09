import { Injectable } from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sucursal } from './schema/sucursal.schema';
import { Model } from 'mongoose';
import { flagE } from 'src/core/enum/FlagEnum';

@Injectable()
export class SucursalService {
  constructor(
    @InjectModel(Sucursal.name) private readonly sucursal: Model<Sucursal>,
  ) {}
  async crearSucursal(nombre: string) {
    if (nombre != 'null') {
      const sucursal = await this.sucursal.findOne({ nombre: nombre });
      if (!sucursal) {
        return this.sucursal.create({ nombre: nombre });
      }
    }
  }

  verificarSucursal(nombre: string) {
    return this.sucursal.exists({ nombre: nombre, flag: flagE.nuevo });
  }

  findAll() {
    return `This action returns all sucursal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sucursal`;
  }

  update(id: number, updateSucursalDto: UpdateSucursalDto) {
    return `This action updates a #${id} sucursal`;
  }

  remove(id: number) {
    return `This action removes a #${id} sucursal`;
  }
}
