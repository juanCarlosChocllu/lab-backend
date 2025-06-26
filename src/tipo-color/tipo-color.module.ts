import { Module } from '@nestjs/common';
import { TipoColorService } from './tipoColor.service';
import { TipoColorController } from './tipoColor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoColor, tipoColorSchema } from './schema/tipoColor.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: TipoColor.name,
          schema: tipoColorSchema,
        },
      ]),
    ],
  controllers: [TipoColorController],
  providers: [TipoColorService],
  exports: [TipoColorService]
})
export class TipoColorModule {}
