import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { DataCombiancionDto } from "./dataCombinacion.dto";

export class CreateCombinacionRecetaDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DataCombiancionDto)
    data: DataCombiancionDto[];
}
