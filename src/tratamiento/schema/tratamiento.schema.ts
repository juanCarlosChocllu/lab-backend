import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection:'Tratamiento'})
export class Tratamiento {
    @Prop()
    codigo:string

    @Prop()
    nombre:string

    @Prop()
    abreviaturaNovar:string

    @Prop()
    tiempo:number
}


export const tratamientoSchema = SchemaFactory.createForClass(Tratamiento)