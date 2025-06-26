import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { RangoTipoE } from "src/core/enum/rangoE";

export class CrearRangoMia {
     @IsNotEmpty()
      @IsString()
      @Transform(({ value }: { value: string }) => value.toUpperCase())
      nombre: string;
    
      @IsNotEmpty()
      @IsString()
      @Transform(({ value }: { value: string }) => value.toUpperCase())
      abreviaturaNovar: string;
    
      @IsEnum(RangoTipoE)
      @IsNotEmpty()
      tipo: string;

      @IsNotEmpty()
      @IsString()
      key:string
}