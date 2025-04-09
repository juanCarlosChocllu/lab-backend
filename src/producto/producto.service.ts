import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { CrearProductoI } from './interface/crearProducto';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './schema/producto.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductoService {
  constructor (@InjectModel(Producto.name) private readonly producto:Model<Producto>){}
  crearProducto(crearProducto: CrearProductoI) {
    return this.producto.create(crearProducto) ;
  }

  

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
