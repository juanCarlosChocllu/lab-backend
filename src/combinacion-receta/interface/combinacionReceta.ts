import { Types } from "mongoose"

export interface combinacionReceta {
     
        material:Types.ObjectId
    
    
        tipoLente:Types.ObjectId
        
 
        rango:Types.ObjectId
    

        colorLente:Types.ObjectId
    

        marcaLente:Types.ObjectId
    

        tratamiento:Types.ObjectId
        
  
        tipoColorLente:Types.ObjectId
    
}

export interface combinacionRecetaNombresI {
     
        material:string
    
    
        tipoLente:string
        
 
        rango:string
    

        colorLente:string
    

        marcaLente:string
    

        tratamiento:string
        
  
        tipoColorLente:string
    
}