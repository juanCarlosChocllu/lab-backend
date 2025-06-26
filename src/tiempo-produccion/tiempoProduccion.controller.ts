import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateTiempoProduccionDto } from './dto/createtiempoProduccion.dto';
import { UpdateTiempoProduccionDto } from './dto/update-tiempo-produccion.dto';
import { Types } from 'mongoose';
import { TiempoProduccionService } from './tiempo-produccion.service';

@Controller('tiempo/produccion')
export class TiempoProduccionController {
  constructor(private readonly tiempoProduccionService: TiempoProduccionService) {}

  @Post()
  create(@Body() createTiempoProduccionDto: CreateTiempoProduccionDto) {
    return this.tiempoProduccionService.create(createTiempoProduccionDto);
  }

  @Get()
  findAll() {
    
    return this.tiempoProduccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiempoProduccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiempoProduccionDto: UpdateTiempoProduccionDto) {
    return this.tiempoProduccionService.update(+id, updateTiempoProduccionDto);
  }


}
