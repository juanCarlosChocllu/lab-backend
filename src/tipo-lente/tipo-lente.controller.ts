import { Controller } from '@nestjs/common';
import { TipoLenteService } from './tipo-lente.service';

@Controller('tipo-lente')
export class TipoLenteController {
  constructor(private readonly tipoLenteService: TipoLenteService) {}
}
