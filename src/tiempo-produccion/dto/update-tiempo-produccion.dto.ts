import { PartialType } from '@nestjs/mapped-types';
import { CreateTiempoProduccionDto } from './createtiempoProduccion.dto';

export class UpdateTiempoProduccionDto extends PartialType(CreateTiempoProduccionDto) {}
