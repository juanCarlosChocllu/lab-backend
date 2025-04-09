import { Types } from "mongoose"

export interface CrearVentaI{
  
        pedido:string

        estado:string
 
        fechaVenta:Date

        sucursal:Types.ObjectId
   
        producto:Types.ObjectId
    
}