import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"
import { flagE } from "src/core/enum/FlagEnum"

@Schema({collection:'Sucursal'})
export class Sucursal {

    @Prop()
    nombre:string

    @Prop({type:Types.ObjectId, ref:'Empresa'})
    empresa:string

    @Prop({type:String, enum:flagE, default:flagE.nuevo})
    flag:string
    
    @Prop({type:Date, default:Date.now})
    fecha:Date
    
}
export const sucursalSchema = SchemaFactory.createForClass(Sucursal)
