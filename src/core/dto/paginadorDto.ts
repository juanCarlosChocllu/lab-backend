import { IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginadorDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limite: number = 20;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  pagina: number = 1;
}
