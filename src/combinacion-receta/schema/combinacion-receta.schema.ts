import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"
import { flagE } from "src/core/enum/FlagEnum"


@Schema({collection:'CombinacionReceta'})
export class CombinacionReceta {
    @Prop()
    codigo:string

    @Prop({type:Types.ObjectId, ref:'Material'})
    material:Types.ObjectId

    @Prop({type:Types.ObjectId, ref:'TipoLente'})
    tipoLente:Types.ObjectId
    
    @Prop({type:Types.ObjectId, ref:'Rango'})
    rango:Types.ObjectId

    @Prop({type:Types.ObjectId, ref:'ColorLente'})
    colorLente:Types.ObjectId

    @Prop({type:Types.ObjectId, ref:'MarcaLente'})
    marcaLente:Types.ObjectId

    @Prop({type:Types.ObjectId, ref:'Tratamiento'})
    tratamiento:Types.ObjectId
    
    @Prop({type:Types.ObjectId, ref:'TipoColorLente'})
    tipoColorLente:Types.ObjectId

     @Prop({ type: Date, default: Date.now() })
    fecha: Date;
        
    @Prop({ type: String, enum: flagE, default: flagE.nuevo })
    flag: flagE;
}

export const combinacionRecetaSchema = SchemaFactory.createForClass(CombinacionReceta) 










