import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoVisionDto {

    @IsString()
    @IsNotEmpty()
    @Transform(({value}:{value:string}) => value.toUpperCase())
    nombre:string
}
