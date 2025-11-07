import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProviderNovarService } from './provider-novar.service';
import { ProviderSqlServerDto } from './dto/ProviderDto';

@Controller('provider/novar')
export class ProviderNovarController {
  constructor(private readonly providerNovarService: ProviderNovarService) {}
  @Post()
  listarTrackings(@Body() providerSqlServerDto: ProviderSqlServerDto) {
    return this.providerNovarService.listarTrackings(providerSqlServerDto);
  }

  @Post(':idTracking')
  obtenerActividadTracking(@Param('idTracking') idTracking: string) {
    return this.providerNovarService.obtenerActividadTracking(idTracking);
  }
}
