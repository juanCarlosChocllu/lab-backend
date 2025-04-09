import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { flagE } from "src/core/enum/FlagEnum";

@Schema({collection:'Venta'})
export class Venta {
    
    @Prop()
    pedido:string

    @Prop()
    estado:string

    @Prop()
    fechaVenta:Date

    @Prop()
    fechaEstimada:Date

    @Prop({type:Types.ObjectId,ref:'Producto'})
    producto:Types.ObjectId

    @Prop({type:Types.ObjectId,ref:'sucursal'})
    sucursal:Types.ObjectId

    @Prop({type:String, enum:flagE, default:flagE.nuevo})
    flag:string

    @Prop({type:Date, default:Date.now})
    fecha:Date
}

export const ventaSchema = SchemaFactory.createForClass(Venta)
ventaSchema.index({pedido:1})