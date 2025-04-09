import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection:'Material'})
export class Material {
     @Prop()
      codigo: string;
    
      @Prop()
      nombre: string;
    
      @Prop()
      abreviaturaNovar: string;
    
      @Prop()
      tiempo: number;
}

export const materialSchema= SchemaFactory.createForClass(Material)