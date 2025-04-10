import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoColorDto } from './createTipocolor.dto';

export class UpdateTipoColorDto extends PartialType(CreateTipoColorDto) {}
