import { Controller } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';

@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  

}
