import { Module } from '@nestjs/common';
import { TipoLenteService } from './tipoLente.service';
import { TipoLenteController } from './tipoLente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoLente, tipolenteSchema } from './schema/tipoLente.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: TipoLente.name,
            schema: tipolenteSchema,
          },
        ]),
      ],
  controllers: [TipoLenteController],
  providers: [TipoLenteService],
  exports: [TipoLenteService],
})
export class TipoLenteModule {}
