import { Module } from '@nestjs/common';

import { TiempoProduccionController } from './tiempoProduccion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TiempoProduccion, tiempoProduccionSchema } from './schema/tiempoProduccion.schema';
import { TiempoProduccionService } from './tiempo-produccion.service';

@Module({
   imports: [
      MongooseModule.forFeature([
        {
          name: TiempoProduccion.name,
          schema: tiempoProduccionSchema,
        },
      ]),
      
    ],
  controllers: [TiempoProduccionController],
  providers: [TiempoProduccionService],
  exports:[TiempoProduccionService]
})
export class TiempoProduccionModule {}
