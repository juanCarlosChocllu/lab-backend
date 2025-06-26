import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProviderService } from '../services/provider.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { multerConfig } from '../utils/multerConfig';

@Controller('excel')
export class ExcelController {
    constructor(private readonly providerService:ProviderService){}

   
    @Post()
    @UseInterceptors(FileInterceptor('file',multerConfig))
    cargarArchivoExcel(@UploadedFile() file: Express.Multer.File){    
        return this.providerService.lectura(file.filename)
    }
}
