import { PartialType } from '@nestjs/mapped-types';
import { CreateLenteDto } from './create-lente.dto';

export class UpdateLenteDto extends PartialType(CreateLenteDto) {}
