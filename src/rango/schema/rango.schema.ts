import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseSchema } from "src/core/schema/BaseSchema"
import { RangoTipoE } from "../../core/enum/rangoE"

@Schema({collection:'Rango'})
export class Rango  extends BaseSchema{
      @Prop()
        codigo:string
    
        @Prop()
        nombre:string
    
        @Prop()
        abreviaturaNovar:string
    
        @Prop({type:Number, default:0})
        tiempo:number

        @Prop({type:String, enum:RangoTipoE})
        tipo:RangoTipoE
}

export const rangoSchema = SchemaFactory.createForClass(Rango)