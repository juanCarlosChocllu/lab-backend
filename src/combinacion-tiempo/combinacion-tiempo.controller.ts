import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CombinacionTiempoService } from './combinacion-tiempo.service';
import { CreateCombinacionTiempoDto } from './dto/create-combinacion-tiempo.dto';
import { UpdateCombinacionTiempoDto } from './dto/update-combinacion-tiempo.dto';

@Controller('combinacion/tiempo')
export class CombinacionTiempoController {
  constructor(private readonly combinacionTiempoService: CombinacionTiempoService) {}

  @Post()
  create(@Body() createCombinacionTiempoDto: CreateCombinacionTiempoDto) {
    
    return this.combinacionTiempoService.create(createCombinacionTiempoDto);
  }

  @Get()
  findAll() {
    return this.combinacionTiempoService.listar();
  }

 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCombinacionTiempoDto: UpdateCombinacionTiempoDto) {
    return this.combinacionTiempoService.update(+id, updateCombinacionTiempoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combinacionTiempoService.remove(+id);
  }
}
