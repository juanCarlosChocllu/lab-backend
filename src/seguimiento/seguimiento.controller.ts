import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';

@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeguimientoDto: UpdateSeguimientoDto) {
    return this.seguimientoService.update(+id, updateSeguimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguimientoService.remove(+id);
  }
}
