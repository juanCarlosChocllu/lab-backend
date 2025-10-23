import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from 'src/core/schema/BaseSchema';

@Schema({ collection: 'Venta' })
export class Venta extends BaseSchema {
  @Prop()
  pedido: string;

  @Prop()
  id_venta: string;

  

  @Prop()
  estado: string;

  @Prop()
  fechaVenta: Date;

  @Prop()
  fechaEstimada: Date;

  @Prop()
  codigo: string;

  @Prop()
  descripcion: string;

  @Prop()
  descripcionCombinacion: string;

  @Prop({ type: Types.ObjectId, ref: 'sucursal' })
  sucursal: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CombinacionReceta' })
  combinacionReceta: Types.ObjectId;
}

export const ventaSchema = SchemaFactory.createForClass(Venta);
ventaSchema.index({ sucursal: 1, fechaVenta:1 ,estado:1});
