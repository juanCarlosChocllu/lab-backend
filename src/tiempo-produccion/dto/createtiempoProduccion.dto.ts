import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { estadoAntireflejoE } from '../enum/estadoAntireflejo';
import { estadoLenteE } from '../enum/estadoLente';
import { estadProcesoE } from '../enum/estadoProceso';
import { Types } from 'mongoose';
import { RangoTipoE } from 'src/core/enum/rangoE';

export class CreateTiempoProduccionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El valor de recepcion no puede ser menor que cero' })
  recepcion: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
  almacen: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El valor de digital no puede ser menor que cero' })
  digital: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
  bisel: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El valor de tinte no puede ser menor que cero' })
  tinte: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El valor de despacho no puede ser menor que cero' })
  despacho: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El valor de controlCalidad no puede ser menor que cero' })
  controlCalidad: number;

  @IsNumber()
  @Min(0, { message: 'El valor de antireflejo no puede ser menor que cero' })
  antireflejo: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, {
    message: 'El valor de timpoLogisticaEntrega no puede ser menor que cero',
  })
  tiempoLogisticaEntrega: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El valor de calculo no puede ser menor que cero' })
  calculo: number;

  @IsNotEmpty()
  @IsEnum(estadoAntireflejoE)
  estadoAntireflejo: string;
  @IsNotEmpty()
  @IsEnum(RangoTipoE)
  tipo: string;

  @IsNotEmpty()
  @IsEnum(estadoLenteE)
  estadoLente: string;

  @IsNotEmpty()
  @IsEnum(estadProcesoE)
  estadoProeceso: string;

  @IsMongoId()
  @IsNotEmpty()
  combinacionTiempo: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  sucursal: Types.ObjectId;
}
