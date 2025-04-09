import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleLenteDto } from './createDetalleLente.dto';

export class UpdateDetalleLenteDto extends PartialType(CreateDetalleLenteDto) {}
