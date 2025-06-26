import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { flagE } from "src/core/enum/FlagEnum";
import { BaseSchema } from "src/core/schema/BaseSchema";

@Schema({collection:'Empresa'})
export class Empresa extends BaseSchema {
    @Prop()
    nombre:string
    

}
export const empresaSchema = SchemaFactory.createForClass(Empresa)