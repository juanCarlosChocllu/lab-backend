import { Types } from "mongoose"

export interface VentaI{
        _id?:Types.ObjectId
        pedido:string

        estado:string
 
        fechaVenta:Date

        sucursal:Types.ObjectId
        codigo:string
        descripcion:string

        id_venta?:string

        combinacionReceta?:Types.ObjectId
        
        descripcionCombinacion?:string
    
}