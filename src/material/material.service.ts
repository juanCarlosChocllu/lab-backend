import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/createMaterial.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Material } from './schema/material.schena';
import { Model } from 'mongoose';

@Injectable()
export class MaterialService {
  constructor(@InjectModel(Material.name) private readonly material:Model<Material>){}
  async create(createMaterialDto: CreateMaterialDto) {
   for (const data of createMaterialDto.data) {
      const material = await this.material.findOne({nombre:data.nombre})
      if(!material){
        await this.material.create(data)
      }
    }
    return {status:HttpStatus.CREATED};
  }

  findAll() {
    return `This action returns all material`;
  }

  findOne(id: number) {
    return `This action returns a #${id} material`;
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
