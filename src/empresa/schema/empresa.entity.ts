import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { flagE } from "src/core/enum/FlagEnum";

@Schema({collection:'Empresa'})
export class Empresa {
    @Prop()
    nombre:string


    @Prop({type:String, enum:flagE, default:flagE.nuevo})
    flag:string
        
    @Prop({type:Date, default:Date.now})
    fecha:Date
}
export const empresaSchema = SchemaFactory.createForClass(Empresa)