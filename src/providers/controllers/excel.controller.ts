import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ExcelService } from '../services/excel.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { multerConfig } from '../utils/multerConfig';

@Controller('excel')
export class ExcelController {
    constructor(private readonly excelService:ExcelService){}

   
    @Post()
    @UseInterceptors(FileInterceptor('file',multerConfig))
    cargarArchivoExcel(@UploadedFile() file: Express.Multer.File){    
        return this.excelService.lectura(file.filename)
    }
}
