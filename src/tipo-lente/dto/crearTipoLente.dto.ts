import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { DataTipoLenteDto } from './dataTipoLente.dto';

export class CrearTipoLenteDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataTipoLenteDto)
  @ArrayMinSize(1)
  data: DataTipoLenteDto[];
}
