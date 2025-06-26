import { Prop } from '@nestjs/mongoose';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TipoLenteE } from '../enum/tipoLente';

export class CreateCombinacionTiempoDto {
  @IsEnum(TipoLenteE)
  @IsNotEmpty()
  tipoLente: string;

  @IsMongoId()
  @IsNotEmpty()
  tipoColor: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  tratamiento: Types.ObjectId;
}
