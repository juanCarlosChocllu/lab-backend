import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { CreateTiempoProduccionDto } from './dto/createtiempoProduccion.dto';
import { UpdateTiempoProduccionDto } from './dto/update-tiempo-produccion.dto';
import { TiempoProduccionService } from './tiempo-produccion.service';
import { PaginadorDto } from 'src/core/dto/paginadorDto';
import { BuscadorTiempoProduccionDto } from './dto/BuscadorTiempoProduccion';

@Controller('tiempo/produccion')
export class TiempoProduccionController {
  constructor(
    private readonly tiempoProduccionService: TiempoProduccionService,
  ) {}

  @Post()
  create(@Body() createTiempoProduccionDto: CreateTiempoProduccionDto) {
    return this.tiempoProduccionService.create(createTiempoProduccionDto);
  }

  @Get()
  findAll(@Query() BuscadorTiempoProduccionDto: BuscadorTiempoProduccionDto) {
    return this.tiempoProduccionService.findAll(BuscadorTiempoProduccionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiempoProduccionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTiempoProduccionDto: UpdateTiempoProduccionDto,
  ) {
    return this.tiempoProduccionService.update(+id, updateTiempoProduccionDto);
  }
}
