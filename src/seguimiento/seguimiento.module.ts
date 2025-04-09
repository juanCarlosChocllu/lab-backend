import { Module } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { SeguimientoController } from './seguimiento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Seguimiento, seguimientoSchema } from './schema/seguimiento.schema';

@Module({
  imports: [
        MongooseModule.forFeature([
          {
            name: Seguimiento.name,
            schema: seguimientoSchema,
          },
        ]),
      ],
  controllers: [SeguimientoController],
  providers: [SeguimientoService],
  exports:[SeguimientoService]
})
export class SeguimientoModule {}
