import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCombinacionRecetaDto } from './dto/create-combinacion-receta.dto';
import { UpdateCombinacionRecetaDto } from './dto/update-combinacion-receta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CombinacionReceta } from './schema/combinacion-receta.schema';
import { Model, Types } from 'mongoose';
import { MaterialService } from 'src/material/material.service';
import { TipoLenteService } from 'src/tipo-lente/tipoLente.service';
import { TratamientoService } from 'src/tratamiento/tratamiento.service';
import { ColorLente } from 'src/color-lente/schema/colorLente.schema';
import { ColorLenteService } from 'src/color-lente/colorLente.service';
import { RangoService } from 'src/rango/rango.service';
import { TipoColorService } from 'src/tipo-color/tipoColor.service';
import { MarcaService } from 'src/marca/marca.service';
import { combinacionReceta } from './interface/combinacionReceta';

@Injectable()
export class CombinacionRecetaService {
  constructor(
    @InjectModel(CombinacionReceta.name) private readonly combinacioReceta:Model<CombinacionReceta>,
     private readonly  materialService:MaterialService,
     private readonly  tipoLenteService:TipoLenteService,
     private readonly tratamiendoService:TratamientoService,
     private readonly colorLenteService:ColorLenteService,
     private readonly rangoService:RangoService,
     private readonly tipoColorService:TipoColorService,
     private readonly marcaService:MarcaService

  ){}
  async create(createCombinacionRecetaDto: CreateCombinacionRecetaDto) {
    for (const data of createCombinacionRecetaDto.data) {
      const material = await this.materialService.verificarMaterial(data.material)
      const tipoLente = await this.tipoLenteService.verificarTipoLente(data.tipoLente)
      const tratamiento = await this.tratamiendoService.verificarTratamiento(data.tratamiento)
      const colorLente  = await this.colorLenteService.verificarColorLente(data.colorLente)
      const rango = await this.rangoService.verificarRango(data.rango)
      const tipoColor =await this.tipoColorService.verificarTipoColor(data.tipoColorLente)
      const marca = await this.marcaService.verificarMarca(data.marcaLente)  
      if(material && tipoLente && tratamiento && colorLente && rango && tipoColor && marca){
        const dataCombinacion:combinacionReceta={
           colorLente:colorLente._id,
           marcaLente:marca._id,
           material:material._id,
           rango:rango._id,
           tipoColorLente:tipoColor._id,
           tipoLente:tipoLente._id,
           tratamiento:tratamiento._id
        }
        await this.combinacioReceta.create(dataCombinacion)
      }
     
    }
    return {statis:HttpStatus.CREATED}
  }

  async registrarCombinacion(data:combinacionReceta) {    
    const receta = await this.combinacioReceta.exists(data)
    if(!receta){
      return await this.combinacioReceta.create(data)
    }
    return receta

  }

  async buscarReceta(id:Types.ObjectId){
    const receta = await this.combinacioReceta.aggregate([
      {
        $match:{
          _id:new Types.ObjectId(id)
        }
      },
      {
        $lookup:{
          from:'TipoLente',
          foreignField:'_id',
          localField:'tipoLente',
          as:'tipoLente'
        }
      },
      {
        $project:{
          material:1,
          tipoLente:{$arrayElemAt:['$tipoLente.nombre',0]},
          rango:1,
          colorLente:1,
          marcaLente:1,
          tratamiento:1,
          tipoColorLente:1,

        }
      }
    ])

    
    return receta[0]
   
  }
  
  findAll() {
    return `This action returns all combinacionReceta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combinacionReceta`;
  }

  update(id: number, updateCombinacionRecetaDto: UpdateCombinacionRecetaDto) {
    return `This action updates a #${id} combinacionReceta`;
  }

  remove(id: number) {
    return `This action removes a #${id} combinacionReceta`;
  }
}
