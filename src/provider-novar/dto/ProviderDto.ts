import { IsDateString, IsNotEmpty } from "class-validator"

export class ProviderSqlServerDto {
    @IsNotEmpty()
        @IsDateString()
        fechaInicio:string
    
        @IsNotEmpty()
        @IsDateString()
        fechaFin:string
    
}