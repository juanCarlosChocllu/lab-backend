import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { flagE } from "src/core/enum/FlagEnum";

@Schema({collection:'Producto'})
export class Producto {

    @Prop()
    codigo:string

    @Prop()
    descripcion:string

    @Prop({type:Types.ObjectId})
    tiempoPrometido:Types.ObjectId
   
    @Prop({type:String, enum:flagE, default:flagE.nuevo})
    flag:string

    @Prop({type:Date, default:Date.now})
    fecha:Date

    
}

export const productoSchema= SchemaFactory.createForClass(Producto)
