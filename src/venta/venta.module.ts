import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Venta, ventaSchema } from './schema/venta.schema';
import { SeguimientoModule } from 'src/seguimiento/seguimiento.module';
import { TiempoProduccionModule } from 'src/tiempo-produccion/tiempo-produccion.module';
import { TratamientoModule } from 'src/tratamiento/tratamiento.module';
import { RangoModule } from 'src/rango/rango.module';
import { CombinacionRecetaModule } from 'src/combinacion-receta/combinacion-receta.module';
import { CombinacionTiempoModule } from 'src/combinacion-tiempo/combinacion-tiempo.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Venta.name,
        schema: ventaSchema,
      },
    ]),
    SeguimientoModule,
    TiempoProduccionModule,
    TratamientoModule,
    RangoModule,
    CombinacionRecetaModule,
    CombinacionTiempoModule
  ],
  controllers: [VentaController],
  providers: [VentaService],
  exports:[VentaService]
})
export class VentaModule {}
