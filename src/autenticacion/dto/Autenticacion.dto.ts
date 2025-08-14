import { IsNotEmpty, IsString } from "class-validator"

export class AutenticacionDto {
    
        @IsNotEmpty()
        @IsString()
        username:string
        
         @IsNotEmpty()
        @IsString()
        password:string
    

}