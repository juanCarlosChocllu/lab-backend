import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class DataTipoLenteDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase())
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase())
  abreviaturaNovar: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  tiempo: number;
}
