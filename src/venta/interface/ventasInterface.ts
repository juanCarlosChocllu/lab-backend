import { Types } from "mongoose";

export interface VentasAggregateI {
     _id?:Types.ObjectId
  estado: string;
  pedido: string;
  codigo: string;
  descripcion: string;
  sucursal: Types.ObjectId;
  combinacionReceta:Types.ObjectId
  fechaVenta: Date;
  descripcionCombinacion:string
  id_venta:string
  
}
