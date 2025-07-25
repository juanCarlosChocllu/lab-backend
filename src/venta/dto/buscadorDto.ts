import { IsArray, IsDateString, IsMongoId, IsNotEmpty,} from "class-validator"
import { Types } from "mongoose"

export class BuscadorDto {

    
    @IsMongoId({each:true})
    @IsNotEmpty()
    sucursal:Types.ObjectId[]

    @IsNotEmpty()
    @IsDateString()
    fechaInicio:string

    @IsNotEmpty()
    @IsDateString()
    fechaFin:string

}
