import { Module } from '@nestjs/common';
import { ExcelService } from './services/excel.service';
import { ExcelController } from './controllers/excel.controller';
import { VentaModule } from 'src/venta/venta.module';
import { SeguimientoModule } from 'src/seguimiento/seguimiento.module';
import { ProductoModule } from 'src/producto/producto.module';
import { SucursalModule } from 'src/sucursal/sucursal.module';


@Module({
    imports:[
    VentaModule, SeguimientoModule, ProductoModule, SucursalModule],
  providers: [ExcelService],
  controllers: [ExcelController]
})
export class ProvidersModule {}
