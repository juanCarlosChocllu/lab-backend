import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LenteService } from './lente.service';
import { CreateLenteDto } from './dto/create-lente.dto';
import { UpdateLenteDto } from './dto/update-lente.dto';

@Controller('lente')
export class LenteController {
  
  constructor(private readonly lenteService: LenteService) {}

  @Post()
  create(@Body() createLenteDto: CreateLenteDto) {
    return this.lenteService.create(createLenteDto);
  }

  @Get()
  findAll() {
    return this.lenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLenteDto: UpdateLenteDto) {
    return this.lenteService.update(+id, updateLenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lenteService.remove(+id);
  }
}
