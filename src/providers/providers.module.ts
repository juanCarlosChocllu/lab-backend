import { Module } from '@nestjs/common';
import { ProviderService } from './services/provider.service';
import { ExcelController } from './controllers/provider.controller';
import { VentaModule } from 'src/venta/venta.module';
import { SeguimientoModule } from 'src/seguimiento/seguimiento.module';
import { ProductoModule } from 'src/producto/producto.module';
import { SucursalModule } from 'src/sucursal/sucursal.module';
import { HttpModule } from '@nestjs/axios';
import { TratamientoModule } from 'src/tratamiento/tratamiento.module';
import { TipoLenteModule } from 'src/tipo-lente/tipo-lente.module';
import { ColorLenteModule } from 'src/color-lente/color-lente.module';
import { RangoModule } from 'src/rango/rango.module';
import { MarcaModule } from 'src/marca/marca.module';
import { TipoColorModule } from 'src/tipo-color/tipo-color.module';
import { MaterialModule } from 'src/material/material.module';
import { CombinacionRecetaModule } from 'src/combinacion-receta/combinacion-receta.module';
import { LenteModule } from 'src/lente/lente.module';


@Module({
    imports:[
      HttpModule,
      CombinacionRecetaModule,
    VentaModule, SeguimientoModule, LenteModule,ProductoModule, SucursalModule, TratamientoModule, TipoLenteModule, ColorLenteModule, RangoModule, MaterialModule, MarcaModule, TipoColorModule],
  providers: [ProviderService],
  controllers: [ExcelController]
})
export class ProvidersModule {}
