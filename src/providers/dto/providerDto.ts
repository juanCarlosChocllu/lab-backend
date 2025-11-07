import { IsDateString, IsNotEmpty } from 'class-validator';

export class ProviderDto {
  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @IsNotEmpty()
  @IsDateString()
  fechaFin: string;
}
