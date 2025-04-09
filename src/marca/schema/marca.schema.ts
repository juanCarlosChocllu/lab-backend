import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({collection:'Marca'})
export class Marca {
  @Prop()
  codigo: string;

  @Prop()
  nombre: string;

  @Prop()
  abreviaturaNovar: string;

  @Prop()
  tiempo: number;
}


export const marcaSchema = SchemaFactory.createForClass(Marca)