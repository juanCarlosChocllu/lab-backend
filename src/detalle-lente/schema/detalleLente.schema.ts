import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "src/core/schema/BaseSchema";

@Schema({collection:'DetalleLente'})
export class DetalleLente  extends BaseSchema{
    @Prop()
    nombre:string
    @Prop({type:Types.ObjectId, ref:'TipoVision'})
    tipoVision:Types.ObjectId
}

export const detalleLenteSchema =SchemaFactory.createForClass(DetalleLente)