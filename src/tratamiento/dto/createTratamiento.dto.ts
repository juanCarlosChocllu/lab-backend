import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { DataTratamientoDto } from "./dataTratamiento.dto";
import { Type } from "class-transformer";

export class CreateTratamientoDto {
    @IsArray()
    @ValidateNested({each:true})
    @Type(() => DataTratamientoDto)
    @ArrayMinSize(1)
    data:DataTratamientoDto[]
}