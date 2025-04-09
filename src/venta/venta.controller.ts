import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { PaginadorDto } from 'src/core/dto/paginadorDto';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  registrarVenta(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.registrarVenta(createVentaDto);
  }

  
  @Get()
  tiemposEntrega(@Query() paginadorDto:PaginadorDto) {
    return this.ventaService.tiemposEntrega(paginadorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventaService.update(+id, updateVentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventaService.remove(+id);
  }
}
