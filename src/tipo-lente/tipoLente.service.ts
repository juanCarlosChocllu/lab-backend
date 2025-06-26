import { HttpStatus, Injectable } from '@nestjs/common';
import { CrearTipoLenteDto } from './dto/crearTipoLente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoLente } from './schema/tipoLente.schema';
import { Model } from 'mongoose';
import { flagE } from 'src/core/enum/FlagEnum';

@Injectable()
export class TipoLenteService {
    constructor(@InjectModel(TipoLente.name) private readonly tipoLente:Model<TipoLente>){}
    async create(crearTipoLenteDto:CrearTipoLenteDto) {
        for (const data of crearTipoLenteDto.data) {
              const tipoLente = await this.tipoLente.findOne({nombre:data.nombre})
              if(!tipoLente) {
                await this.tipoLente.create(data)
              }
           }  
           return {status:HttpStatus.CREATED}
    }

    async verificarTipoLente(nombre:string){
      const tipoLente = await this.tipoLente.findOne({nombre:nombre.toUpperCase()})
      return tipoLente
    }

     async registarTipoLenteLente(nombre: string, abreviaturaNovar: string) {
    const tipoLente = await this.tipoLente.findOne({ nombre: nombre });
    if (!tipoLente) {
      return await this.tipoLente.create({
        nombre: nombre,
        abreviaturaNovar: abreviaturaNovar,
      });
    }
    return tipoLente;
  }

  async listar() {
    const tipoLente = await this.tipoLente.find({ flag: flagE.nuevo });
    return tipoLente;
  }
}
