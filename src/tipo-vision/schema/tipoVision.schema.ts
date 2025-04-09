import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({collection:'TipoVision'})
export class TipoVision {
    @Prop()
    nombre:string
}
export const tipoVisionSchema =SchemaFactory.createForClass(TipoVision)