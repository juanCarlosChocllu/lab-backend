import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RangoService } from './rango.service';
import { CreateRangoDto } from './dto/createRango.dto';
import { UpdateRangoDto } from './dto/update-rango.dto';
import { DataRangoDto } from './dto/dataRango.dto';
import { CrearRangoMia } from './dto/crearRangoMia.dto';

@Controller('rango')
export class RangoController {
  constructor(private readonly rangoService: RangoService) {}

  @Post()
  create(@Body() createRangoDto: CreateRangoDto) {
    return this.rangoService.create(createRangoDto);
  }

  
  @Post('registrar')
  registrarRangoMia(@Body() crearRangoMia: CrearRangoMia) {
    return this.rangoService.registrarRangoMia(crearRangoMia);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRangoDto: UpdateRangoDto) {
    return this.rangoService.update(+id, updateRangoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rangoService.remove(+id);
  }
}
