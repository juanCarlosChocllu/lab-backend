import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCombinacionTiempoDto } from './dto/create-combinacion-tiempo.dto';
import { UpdateCombinacionTiempoDto } from './dto/update-combinacion-tiempo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CombinacionTiempo } from './schema/combinacionTiempo.schema';
import { Model, Types } from 'mongoose';
import { CombinacionTiempoI } from './interface/combinacionTiempo';

@Injectable()
export class CombinacionTiempoService {
  constructor(
    @InjectModel(CombinacionTiempo.name)
    private readonly combinacionTiempo: Model<CombinacionTiempo>,
  ) {}

  async create(createCombinacionTiempoDto: CreateCombinacionTiempoDto) {
    createCombinacionTiempoDto.tipoColor = new Types.ObjectId(
      createCombinacionTiempoDto.tipoColor,
    );
    createCombinacionTiempoDto.tratamiento = new Types.ObjectId(
      createCombinacionTiempoDto.tratamiento,
    );
    createCombinacionTiempoDto.tipoLente = createCombinacionTiempoDto.tipoLente;

    const data = await this.combinacionTiempo.findOne(
      createCombinacionTiempoDto,
    );
    if (!data) {
      await this.combinacionTiempo.create(createCombinacionTiempoDto);
      return { status: HttpStatus.CREATED };
    }
    throw new ConflictException();
  }

  async guardarCombinacion(
    createCombinacionTiempoDto: CreateCombinacionTiempoDto,
  ) {
    createCombinacionTiempoDto.tipoColor = new Types.ObjectId(
      createCombinacionTiempoDto.tipoColor,
    );
    createCombinacionTiempoDto.tratamiento = new Types.ObjectId(
      createCombinacionTiempoDto.tratamiento,
    );
    createCombinacionTiempoDto.tipoLente = createCombinacionTiempoDto.tipoLente;

    const data = await this.combinacionTiempo.findOne(
      createCombinacionTiempoDto,
    );
    if (!data) {
      return this.combinacionTiempo.create(createCombinacionTiempoDto);
    }
    return data;
  }

  async listar() {
    const resultado = await this.combinacionTiempo.aggregate([
      {
        $lookup: {
          from: 'TipoColor',
          foreignField: '_id',
          localField: 'tipoColor',
          as: 'tipoColor',
        },
      },
      {
        $lookup: {
          from: 'Tratamiento',
          foreignField: '_id',
          localField: 'tratamiento',
          as: 'tratamiento',
        },
      },
      {
        $project: {
          tipoLente: 1,
          tratamiento: { $arrayElemAt: ['$tratamiento.nombre', 0] },
          tipoColor: { $arrayElemAt: ['$tipoColor.nombre', 0] },
        },
      },
    ]);
    return resultado;
  }

  async buscarCombiancionTiempo(data: CombinacionTiempoI) { 
     
    return await this.combinacionTiempo.findOne(data);
  }

  update(id: number, updateCombinacionTiempoDto: UpdateCombinacionTiempoDto) {
    return `This action updates a #${id} combinacionTiempo`;
  }

  remove(id: number) {
    return `This action removes a #${id} combinacionTiempo`;
  }
}
