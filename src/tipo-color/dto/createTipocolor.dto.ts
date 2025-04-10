import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { DataTipoColorDto } from "./dataTipoColor.dto";

export class CreateTipoColorDto {
      @IsArray()
        @ValidateNested({each:true})
        @Type(() => DataTipoColorDto)
        @ArrayMinSize(1)
        data:DataTipoColorDto[]
}
