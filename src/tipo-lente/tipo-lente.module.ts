import { Module } from '@nestjs/common';
import { TipoLenteService } from './tipo-lente.service';
import { TipoLenteController } from './tipo-lente.controller';

@Module({
  controllers: [TipoLenteController],
  providers: [TipoLenteService],
})
export class TipoLenteModule {}
