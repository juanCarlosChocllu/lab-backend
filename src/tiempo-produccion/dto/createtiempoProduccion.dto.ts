import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, Min } from "class-validator"
import { estadoAntireflejoE } from "../enum/estadoAntireflejo"
import { estadoLenteE } from "../enum/estadoLente"
import { estadProcesoE } from "../enum/estadoProceso"
import { Types } from "mongoose"

export class CreateTiempoProduccionDto {

        @IsNotEmpty()
        @IsNumber()
        @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
        recepcion:number
        
        @IsNotEmpty()
        @IsNumber()
        @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
        almacen:number
        
        @IsNotEmpty()
        @IsNumber()
        @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
        digital:number
        
        @IsNotEmpty()
        @IsNumber()
        @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
        bisel:number
        
        @IsNotEmpty()
        @IsNumber()
        @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
        tinte:number
    
        @IsNotEmpty()
        @IsNumber()
        @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
        despacho:number
     
        @IsNotEmpty()
        @IsNumber()
        @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
        controlCalidad:number
        
        @IsNotEmpty()
        @IsNumber()
        @Min(0, { message: 'El valor de almacen no puede ser menor que cero' })
        timpoLogisticaEntrega:number
        
        @IsNotEmpty()
       
        @IsEnum(estadoAntireflejoE)
        estadoAntireflejo:string
        
        @IsNotEmpty()

        @IsEnum(estadoLenteE)
        estadoLente:string
       
        @IsNotEmpty()
   
        @IsEnum(estadProcesoE)
        estadoProeceso:string

        @IsMongoId()
        @IsNotEmpty()
        detalleLente:Types.ObjectId
}
