import { Module } from '@nestjs/common';
import { TiempoProduccionService } from './tiempo-produccion.service';
import { TiempoProduccionController } from './tiempo-produccion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TiempoProduccion, tiempoProduccionSchema } from './schema/tiempoProduccion.schema';

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
})
export class TiempoProduccionModule {}
