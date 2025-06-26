import { Types } from "mongoose";

export interface LenteVentaI{
      codigo:string
      nombre: string;
      tipo: string;

      antireflejo: string;
      
      grupoProducto: string;
     
      venta: Types.ObjectId;
}