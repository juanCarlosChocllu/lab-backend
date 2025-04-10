import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ColorLente' })
export class ColorLente {
  @Prop()
  codigo: string;

  @Prop()
  nombre: string;

  @Prop()
  abreviaturaNovar: string;

  @Prop()
  tiempo: number;
}

export const colorLenteSchema = SchemaFactory.createForClass(ColorLente)
