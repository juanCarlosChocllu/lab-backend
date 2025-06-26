import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { BaseSchema } from "src/core/schema/BaseSchema"
@Schema({collection:'TipoLente'})
export class TipoLente extends BaseSchema {
      @Prop()
            codigo:string
        
            @Prop()
            nombre:string
        
            @Prop()
            abreviaturaNovar:string
        
          @Prop({type:Number, default:0})
            tiempo:number
}
export const tipolenteSchema = SchemaFactory.createForClass(TipoLente)