import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from 'src/core/schema/BaseSchema';

@Schema({ collection: 'CombinacionTiempo' })
export class CombinacionTiempo extends BaseSchema {
  @Prop()
  tipoLente: string;

  @Prop({ type: Types.ObjectId, ref: 'TipoColor' })
  tipoColor: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Tratamiento' })
  tratamiento: Types.ObjectId;
}

export const combinacionTiempoSchema =
  SchemaFactory.createForClass(CombinacionTiempo);
combinacionTiempoSchema.index({tipoLente:1,tipoColor:1,tratamiento:1 })