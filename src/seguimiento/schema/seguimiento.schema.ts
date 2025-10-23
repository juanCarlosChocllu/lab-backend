import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { flagE } from "src/core/enum/FlagEnum";

@Schema({collection:'Seguimiento'})
export class Seguimiento {
    @Prop()
    tracking:string

    @Prop()
    sector:string

    @Prop()
    fechaTracking:Date

    @Prop()
    reproceso:string
    

    @Prop({type:Types.ObjectId, ref:'Venta'})
    venta:Types.ObjectId

    @Prop({type:String, enum:flagE, default:flagE.nuevo})
    flag:string

    @Prop({type:Date, default:Date.now})
    fecha:Date
}

export const seguimientoSchema = SchemaFactory.createForClass(Seguimiento)
seguimientoSchema.index({venta:1})