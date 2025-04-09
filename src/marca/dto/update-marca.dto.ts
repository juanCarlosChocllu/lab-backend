import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcaDto } from './createMarca.dto';

export class UpdateMarcaDto extends PartialType(CreateMarcaDto) {}
