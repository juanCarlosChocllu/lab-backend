import { PartialType } from '@nestjs/mapped-types';
import { CreateColorLenteDto } from './createColorLente.dto';

export class UpdateColorLenteDto extends PartialType(CreateColorLenteDto) {}
