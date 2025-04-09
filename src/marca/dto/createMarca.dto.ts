import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { DataMarcaDto } from "./dataMarca.dto";

export class CreateMarcaDto {
      @IsArray()
        @ValidateNested({each:true})
        @Type(() => DataMarcaDto)
        @ArrayMinSize(1)
        data:DataMarcaDto[]
    
}
