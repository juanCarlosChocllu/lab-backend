import { PartialType } from '@nestjs/mapped-types';
import { CreateCombinacionTiempoDto } from './create-combinacion-tiempo.dto';

export class UpdateCombinacionTiempoDto extends PartialType(CreateCombinacionTiempoDto) {}
