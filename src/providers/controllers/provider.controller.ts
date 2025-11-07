import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProviderService } from '../services/provider.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { multerConfig } from '../utils/multerConfig';
import { ProviderDto } from '../dto/providerDto';

@Controller()
export class ExcelController {
  constructor(private readonly providerService: ProviderService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  cargarArchivoExcel(@UploadedFile() file: Express.Multer.File) {
    return this.providerService.lectura(file.filename);
  }

  @Post('excel/tiempo/entrega')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  tiempoEntrega(@UploadedFile() file: Express.Multer.File) {
    return this.providerService.tiempoEntrega(file.filename);
  }

  @Post('novar/guardarPedidos')
  guardarPedidos(@Body() providerDto:ProviderDto){
    return this.providerService.guardarPedidos(providerDto)
  }

}
