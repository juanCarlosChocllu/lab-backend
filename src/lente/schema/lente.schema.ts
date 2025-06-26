import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaType, Types } from 'mongoose';
import { BaseSchema } from 'src/core/schema/BaseSchema';

@Schema({ collection: 'Lente' })
export class Lente extends BaseSchema {
   @Prop()
  codigo: string;

  @Prop()
  nombre: string;

  @Prop()
  tipo: string;
  @Prop()
  antireflejo: string;
  @Prop()
  grupoProducto: string;
  @Prop({ type: Types.ObjectId, ref: 'Venta' })
  venta: Types.ObjectId;
}
export const lenteSchema = SchemaFactory.createForClass(Lente)