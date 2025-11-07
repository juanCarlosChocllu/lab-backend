import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { PaginadorDto } from 'src/core/dto/paginadorDto';
import { BuscadorDto } from './dto/buscadorDto';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  

  
  @Post('listar')
  tiemposEntrega(@Body() buscadorDto:BuscadorDto) {
    return this.ventaService.tiemposEntrega(buscadorDto);
  }

  
}
