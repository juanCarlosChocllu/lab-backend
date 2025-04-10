import { HttpStatus, Injectable } from '@nestjs/common';
import { CrearTipoLenteDto } from './dto/crearTipoLente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoLente } from './schema/tipoLente.schema';
import { Model } from 'mongoose';

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
}
