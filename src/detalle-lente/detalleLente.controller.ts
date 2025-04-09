import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleLenteService } from './detalleLente.service';
import { CreateDetalleLenteDto } from './dto/createDetalleLente.dto';
import { UpdateDetalleLenteDto } from './dto/UpdateDetalleLente.dto';

@Controller('detalle/lente')
export class DetalleLenteController {
  constructor(private readonly detalleLenteService: DetalleLenteService) {}

  @Post()
  create(@Body() createDetalleLenteDto: CreateDetalleLenteDto) {
    return this.detalleLenteService.create(createDetalleLenteDto);
  }

  @Get()
  findAll() {
    return this.detalleLenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleLenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleLenteDto: UpdateDetalleLenteDto) {
    return this.detalleLenteService.update(+id, updateDetalleLenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleLenteService.remove(+id);
  }
}
