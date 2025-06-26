import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { DataRangoDto } from "./dataRango.dto";
import { Type } from "class-transformer";

export class CreateRangoDto {
    @IsArray()
    @ValidateNested({each:true})
    @Type(() => DataRangoDto)
    @ArrayMinSize(1)
    data:DataRangoDto[]
}
