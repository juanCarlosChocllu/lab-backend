import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoVisionService } from './tipoVision.service';
import { CreateTipoVisionDto } from './dto/create-tipo-vision.dto';
import { UpdateTipoVisionDto } from './dto/update-tipo-vision.dto';

@Controller('tipo/vision')
export class TipoVisionController {
  constructor(private readonly tipoVisionService: TipoVisionService) {}

  @Post()
  create(@Body() createTipoVisionDto: CreateTipoVisionDto) {
    return this.tipoVisionService.create(createTipoVisionDto);
  }

  @Get()
  findAll() {
    return this.tipoVisionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoVisionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoVisionDto: UpdateTipoVisionDto) {
    return this.tipoVisionService.update(+id, updateTipoVisionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoVisionService.remove(+id);
  }
}
