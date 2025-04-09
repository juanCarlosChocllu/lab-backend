import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { DataMaterialDto } from "./dataMaterial.dto";
import { Type } from "class-transformer";

export class CreateMaterialDto {
     @IsArray()
            @ValidateNested({each:true})
            @Type(() => DataMaterialDto)
            @ArrayMinSize(1)
            data:DataMaterialDto[]
}
