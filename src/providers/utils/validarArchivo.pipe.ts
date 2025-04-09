import {Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class ValidarArchivoPipe implements PipeTransform {
  private  extenciones:string[] = ['.xlsx']

  transform(value:  Express.Multer.File) {
   
    const extencionArchivo = path.extname(value.originalname)
    if(this.extenciones.includes(extencionArchivo)) {      
      return value;
    }
    
    throw new UnprocessableEntityException()
    
  
  }
}
