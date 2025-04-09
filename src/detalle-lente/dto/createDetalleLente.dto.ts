import { Prop } from "@nestjs/mongoose";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateDetalleLenteDto {
    
    @IsString()
    @IsNotEmpty()
    nombre:string

    @IsMongoId()
    @IsNotEmpty()
    tipoVision:Types.ObjectId
}   
