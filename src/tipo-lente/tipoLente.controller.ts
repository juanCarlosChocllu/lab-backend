import { Body, Controller,Get,Post } from '@nestjs/common';
import { TipoLenteService } from './tipoLente.service';
import { CrearTipoLenteDto } from './dto/crearTipoLente.dto';

@Controller('tipo/lente')
export class TipoLenteController {
  constructor(private readonly tipoLenteService: TipoLenteService) {}

  @Post()
  create(@Body() CrearTipoLenteDto:CrearTipoLenteDto ) {
      return this.tipoLenteService.create(CrearTipoLenteDto)
  }

  
  @Get()
  listar() {
      return this.tipoLenteService.listar()
  }
}
