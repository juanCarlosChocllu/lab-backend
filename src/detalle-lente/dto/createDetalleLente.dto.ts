import { Prop } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateDetalleLenteDto {
    
    @IsString()
    @IsNotEmpty()
    @Transform(({value}:{value:string}) => value.toUpperCase())
    nombre:string

    @IsMongoId()
    @IsNotEmpty()
    tipoVision:Types.ObjectId
}   
