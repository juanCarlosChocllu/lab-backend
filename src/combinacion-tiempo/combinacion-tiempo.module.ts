import { Module } from '@nestjs/common';
import { CombinacionTiempoService } from './combinacion-tiempo.service';
import { CombinacionTiempoController } from './combinacion-tiempo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CombinacionTiempo, combinacionTiempoSchema } from './schema/combinacionTiempo.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: CombinacionTiempo.name,
          schema: combinacionTiempoSchema,
        },
      ]),
    ],
  controllers: [CombinacionTiempoController],
  providers: [CombinacionTiempoService],
    exports: [CombinacionTiempoService],
})
export class CombinacionTiempoModule {}
