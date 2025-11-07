import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginadorDto } from 'src/core/dto/paginadorDto';

export class BuscadorTiempoProduccionDto  extends PaginadorDto{
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  recepcion?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  almacen?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  calculo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  digital?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  antireflejo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bisel?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tinte?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  despacho?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  controlCalidad?: number;

  @IsOptional()
  @IsString()
  estadoAntireflejo?: string;

  @IsOptional()
  @IsString()
  estadoLente?: string;

  @IsOptional()
  @IsString()
  estadoProeceso?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tiempoLogisticaEntrega?: number;

  @IsOptional()
  @IsString()
  tipoLente?: string;

  @IsOptional()
  @IsString()
  tipoColor?: string;

  @IsOptional()
  @IsString()
  tratamiento?: string;

  @IsOptional()
  @IsString()
  sucursal?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tiempoTransporte?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  esperaMontura?: number;
}
