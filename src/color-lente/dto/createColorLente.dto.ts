import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { DataColorLenteDto } from "./dataColorLente.dto";

export class CreateColorLenteDto {
      @IsArray()
            @ValidateNested({each:true})
            @Type(() => DataColorLenteDto)
            @ArrayMinSize(1)
            data:DataColorLenteDto[]
}   
