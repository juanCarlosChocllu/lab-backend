import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Venta, ventaSchema } from './schema/venta.schema';
import { SeguimientoModule } from 'src/seguimiento/seguimiento.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Venta.name,
        schema: ventaSchema,
      },
    ]),
    SeguimientoModule
  ],
  controllers: [VentaController],
  providers: [VentaService],
  exports:[VentaService]
})
export class VentaModule {}
