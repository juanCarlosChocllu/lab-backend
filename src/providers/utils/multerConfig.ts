import { UnprocessableEntityException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';
import { uuid } from 'src/core/util/uuid';

const extencionesValidas: string[] = ['.xlsx'];

export const multerConfig: MulterOptions = {
  fileFilter(req, file, callback) {  
    const extencion = path.extname(file.originalname);
    if (extencionesValidas.includes(extencion)) {
     
      return callback(null, true);
    }
    return callback(new UnprocessableEntityException(), false);
  },
  storage: diskStorage({
    destination: './reports',
    filename(req, file, callback) {
      const extencion = path.extname(file.originalname);
      const archivo = uuid() + extencion;
      callback(null, archivo);
    },
  }),
};
