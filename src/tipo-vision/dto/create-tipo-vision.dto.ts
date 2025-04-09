import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoVisionDto {

    @IsString()
    @IsNotEmpty()
    nombre:string
}
