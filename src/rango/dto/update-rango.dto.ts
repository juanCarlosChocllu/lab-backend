import { PartialType } from '@nestjs/mapped-types';
import { CreateRangoDto } from './createRango.dto';

export class UpdateRangoDto extends PartialType(CreateRangoDto) {}
