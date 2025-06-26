import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Type } from "class-transformer"
import { Types } from "mongoose"
import { RangoTipoE } from "src/core/enum/rangoE"
import { BaseSchema } from "src/core/schema/BaseSchema"
@Schema({collection:'TiempoProduccion'})
export class TiempoProduccion  extends BaseSchema{
    @Prop({default:0})
    recepcion:number


    @Prop({default:0})
    almacen:number

    @Prop({default:0})
    calculo:number

    @Prop({default:0})
    digital:number

    @Prop({default:0})
    antireflejo:number

    @Prop({default:0})
    bisel:number

    @Prop({default:0})
    tinte:number
    @Prop({default:0})

    despacho:number
    @Prop({default:0})
    controlCalidad:number
    
    @Prop({default:0})
    tiempoLogisticaEntrega:number


    @Prop()
    estadoAntireflejo:string

    @Prop()
    estadoLente:string
    
    @Prop()
    estadoProeceso:string


    @Prop({type:Types.ObjectId, ref:'CombinacionTiempo'})
    combinacionTiempo:Types.ObjectId

    @Prop({type:Types.ObjectId, ref:'Sucursal'})
    sucursal:Types.ObjectId
    @Prop({type:String, enum:RangoTipoE})
    tipo:string
}
export const tiempoProduccionSchema = SchemaFactory.createForClass(TiempoProduccion)