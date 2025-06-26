import { Module } from '@nestjs/common';
import { CombinacionRecetaService } from './combinacion-receta.service';
import { CombinacionRecetaController } from './combinacion-receta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CombinacionReceta, combinacionRecetaSchema } from './schema/combinacion-receta.schema';
import { TratamientoModule } from 'src/tratamiento/tratamiento.module';
import { TipoLenteModule } from 'src/tipo-lente/tipo-lente.module';
import { MaterialModule } from 'src/material/material.module';
import { RangoModule } from 'src/rango/rango.module';
import { ColorLenteModule } from 'src/color-lente/color-lente.module';
import { MarcaModule } from 'src/marca/marca.module';
import { TipoColorModule } from 'src/tipo-color/tipo-color.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CombinacionReceta.name,
        schema: combinacionRecetaSchema,
      },
    ]),
    MaterialModule,
    TratamientoModule,
    TipoLenteModule,
    RangoModule,
    ColorLenteModule,
    MarcaModule,
    TipoColorModule
  ],

  controllers: [CombinacionRecetaController],
  providers: [CombinacionRecetaService],
  exports:[CombinacionRecetaService]
})
export class CombinacionRecetaModule {}
