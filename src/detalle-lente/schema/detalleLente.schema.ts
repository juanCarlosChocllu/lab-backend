import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Types } from "mongoose";

@Schema({collection:'DetalleLente'})
export class DetalleLente {
    @Prop()
    nombre:string
    @Prop({type:Types.ObjectId, ref:'TipoVision'})
    tipoVision:Types.ObjectId
}

export const detalleLenteSchema =SchemaFactory.createForClass(DetalleLente)