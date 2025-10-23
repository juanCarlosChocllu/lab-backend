import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { RangoService } from './rango.service';
import { CreateRangoDto } from './dto/createRango.dto';
import { UpdateRangoDto } from './dto/update-rango.dto';
import { DataRangoDto } from './dto/dataRango.dto';
import { CrearRangoMia } from './dto/crearRangoMia.dto';
import { Types } from 'mongoose';
import { ValidardIdPipe } from 'src/core/util/validard-id.pipe';
import { HttpStatusCode } from 'axios';

@Controller('rango')
export class RangoController {
  constructor(private readonly rangoService: RangoService) { }

  @Post()
  create(@Body() createRangoDto: CreateRangoDto) {
    return this.rangoService.create(createRangoDto);
  }

  @Post('registrar')
  registrarRangoMia(@Body() crearRangoMia: CrearRangoMia) {
    return this.rangoService.registrarRangoMia(crearRangoMia);
  }

  @Get()
  listarRangos() {
    return this.rangoService.listarRangos();
  }

  @HttpCode(HttpStatusCode.Ok)
  @Patch(':id/:tipo')
  asignarTipo(@Param('id', ValidardIdPipe) id: Types.ObjectId, @Param('tipo') tipo: string) {    
    return this.rangoService.asignarTipo(id, tipo);
  }
}
