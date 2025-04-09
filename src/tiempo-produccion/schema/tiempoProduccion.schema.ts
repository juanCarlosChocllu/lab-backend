import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Type } from "class-transformer"
import { Types } from "mongoose"
@Schema({collection:'TiempoProduccion'})
export class TiempoProduccion {
    @Prop({default:0})
    recepcion:number
    @Prop({default:0})
    almacen:number
    @Prop({default:0})
    digital:number
    @Prop({default:0})
    bisel:number
    @Prop({default:0})
    tinte:number
    @Prop({default:0})
    despacho:number
    @Prop({default:0})
    controlCalidad:number
    @Prop({default:0})
    timpoLogisticaEntrega:number
    @Prop()
    estadoAntireflejo:string
    @Prop()
    estadoLente:string
    @Prop()
    estadoProeceso:string

    @Prop({type:Types.ObjectId, ref:'DetalleLente'})
    detalleLente:Types.ObjectId
}
export const tiempoProduccionSchema = SchemaFactory.createForClass(TiempoProduccion)