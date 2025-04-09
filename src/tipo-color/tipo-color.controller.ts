import { Controller } from '@nestjs/common';
import { TipoColorService } from './tipo-color.service';

@Controller('tipo-color')
export class TipoColorController {
  constructor(private readonly tipoColorService: TipoColorService) {}
}
