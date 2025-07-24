import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class BuscadorDto {

    @IsOptional()
    @IsString()
    pedido:RegExp

    @IsOptional()
    @IsString()
    idVenta:RegExp

    @IsNotEmpty()
    @IsDateString()
    fechaInicio:string

    @IsNotEmpty()
    @IsDateString()
    fechaFin:string

}
