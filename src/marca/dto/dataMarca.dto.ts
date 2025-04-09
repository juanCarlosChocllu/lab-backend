import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class DataMarcaDto {

        @IsNotEmpty()
        @IsString()   
        nombre:string
    
        @IsNotEmpty()
        @IsString()   
        abreviaturaNovar:string
    
        @IsNotEmpty()
        @IsNumber()
        @Min(0)   
        tiempo:number
    
}