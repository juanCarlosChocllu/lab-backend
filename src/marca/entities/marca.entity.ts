import { Prop } from '@nestjs/mongoose';

export class Marca {
  @Prop()
  codigo: string;

  @Prop()
  nombre: string;

  @Prop()
  abreviaturaNova: string;

  @Prop()
  tiempo: number;
}
