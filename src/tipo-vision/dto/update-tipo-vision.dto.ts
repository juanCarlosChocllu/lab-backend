import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoVisionDto } from './create-tipo-vision.dto';

export class UpdateTipoVisionDto extends PartialType(CreateTipoVisionDto) {}
