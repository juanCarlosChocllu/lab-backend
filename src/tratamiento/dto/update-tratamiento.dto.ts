import { PartialType } from '@nestjs/mapped-types';
import { CreateTratamientoDto } from './createTratamiento.dto';

export class UpdateTratamientoDto extends PartialType(CreateTratamientoDto) {}
