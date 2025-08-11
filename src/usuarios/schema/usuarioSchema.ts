import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "src/core/schema/BaseSchema";

@Schema({collection:'Usuarios'})
export class Usuario extends BaseSchema {
@Prop()
    nombre:string

    @Prop()
    apellidos:string

    @Prop()
    username:string
    
    @Prop({select:false})
    password:string
    
    @Prop()
    rol:string   
}
export const usuariosSchema = SchemaFactory.createForClass(Usuario)
