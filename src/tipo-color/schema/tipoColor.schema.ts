import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({collection:'TipoColor'})
export class TipoColor {
      @Prop()
        codigo:string
    
        @Prop()
        nombre:string
    
        @Prop()
        abreviaturaNovar:string
    
        @Prop()
        tiempo:number
}

export const tipoColorSchema = SchemaFactory.createForClass(TipoColor)
