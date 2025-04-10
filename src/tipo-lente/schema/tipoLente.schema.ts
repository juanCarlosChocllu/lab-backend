import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema({collection:'TipoLente'})
export class TipoLente {
      @Prop()
            codigo:string
        
            @Prop()
            nombre:string
        
            @Prop()
            abreviaturaNovar:string
        
            @Prop()
            tiempo:number
}
export const tipolenteSchema = SchemaFactory.createForClass(TipoLente)