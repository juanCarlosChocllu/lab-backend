import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TratamientoService } from './tratamiento.service';
import { CreateTratamientoDto } from './dto/createTratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';

@Controller('tratamiento')
export class TratamientoController {
  constructor(private readonly tratamientoService: TratamientoService) {}

  @Post()
  create(@Body() createTratamientoDto: CreateTratamientoDto) {
    return this.tratamientoService.create(createTratamientoDto);
  }

  @Get()
  findAll() {
    return this.tratamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tratamientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTratamientoDto: UpdateTratamientoDto) {
    return this.tratamientoService.update(+id, updateTratamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tratamientoService.remove(+id);
  }
}
