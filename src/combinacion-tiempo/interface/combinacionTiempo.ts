import { Types } from "mongoose";

export interface CombinacionTiempoI{
 
      tipoLente: Types.ObjectId;

      
      tipoColor: Types.ObjectId;

      tratamiento: Types.ObjectId;
    
}