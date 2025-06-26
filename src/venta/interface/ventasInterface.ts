import { Types } from "mongoose";

export interface VentasAggregateI {
     _id?:Types.ObjectId
  estado: string;
  pedido: string;
  codigo: string;
  descripcion: string;
  sucursal: string;
  combinacionReceta:Types.ObjectId
  fechaVenta: Date;
  descripcionCombinacion:string
  
}
