import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({collection:'Rango'})
export class Rango {
      @Prop()
        codigo:string
    
        @Prop()
        nombre:string
    
        @Prop()
        abreviaturaNovar:string
    
        @Prop()
        tiempo:number
}

export const rangoSchema = SchemaFactory.createForClass(Rango)