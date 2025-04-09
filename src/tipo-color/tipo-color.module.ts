import { Module } from '@nestjs/common';
import { TipoColorService } from './tipo-color.service';
import { TipoColorController } from './tipo-color.controller';

@Module({
  controllers: [TipoColorController],
  providers: [TipoColorService],
})
export class TipoColorModule {}
