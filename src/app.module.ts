import { Module } from '@nestjs/common';
import { VentaModule } from './venta/venta.module';
import { EmpresaModule } from './empresa/empresa.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { ProductoModule } from './producto/producto.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseUrl } from './core/config/variablesEntorno';
import { ProvidersModule } from './providers/providers.module';
import { TiempoProduccionModule } from './tiempo-produccion/tiempo-produccion.module';
import { TipoVisionModule } from './tipo-vision/tipo-vision.module';
import { DetalleLenteModule } from './detalle-lente/detalle-lente.module';
import { TipoLenteModule } from './tipo-lente/tipo-lente.module';
import { TipoColorModule } from './tipo-color/tipo-color.module';


import { MarcaModule } from './marca/marca.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { RangoModule } from './rango/rango.module';
import { ColorLenteModule } from './color-lente/color-lente.module';
import { MaterialModule } from './material/material.module';;
import { CombinacionRecetaModule } from './combinacion-receta/combinacion-receta.module';
import { LenteModule } from './lente/lente.module';
import { CombinacionTiempoModule } from './combinacion-tiempo/combinacion-tiempo.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(databaseUrl),
    VentaModule,
    EmpresaModule,
    SucursalModule,
    ProductoModule,
    SeguimientoModule,
    CoreModule,
    ProvidersModule,
    TiempoProduccionModule,
    TipoVisionModule,
    DetalleLenteModule,

    TipoLenteModule,
    TipoColorModule,
    MarcaModule,
    TratamientoModule,
    RangoModule,
    ColorLenteModule,
    MaterialModule,
    CombinacionRecetaModule,
    LenteModule,
    CombinacionTiempoModule,
    UsuariosModule,
    AutenticacionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
