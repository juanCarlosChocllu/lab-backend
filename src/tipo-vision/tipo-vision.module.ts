import { Module } from '@nestjs/common';
import { TipoVisionService } from './tipoVision.service';
import { TipoVisionController } from './tipovision.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoVision, tipoVisionSchema } from './schema/tipoVision.schema';

@Module({
   imports: [
        MongooseModule.forFeature([
          {
            name: TipoVision.name,
            schema:tipoVisionSchema,
          },
        ]),
      ],
  controllers: [TipoVisionController],
  providers: [TipoVisionService],
})
export class TipoVisionModule {}
