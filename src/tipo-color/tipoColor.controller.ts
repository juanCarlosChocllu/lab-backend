import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoColorService } from './tipoColor.service';
import { CreateTipoColorDto } from './dto/createTipocolor.dto';
import { UpdateTipoColorDto } from './dto/update-tipo-color.dto';

@Controller('tipo/color')
export class TipoColorController {
  constructor(private readonly tipoColorService: TipoColorService) {}

  @Post()
  create(@Body() createTipoColorDto: CreateTipoColorDto) {
    return this.tipoColorService.create(createTipoColorDto);
  }

  @Get()
  findAll() {
    return this.tipoColorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoColorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoColorDto: UpdateTipoColorDto) {
    return this.tipoColorService.update(+id, updateTipoColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoColorService.remove(+id);
  }
}
