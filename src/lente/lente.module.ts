import { Module } from '@nestjs/common';
import { LenteService } from './lente.service';
import { LenteController } from './lente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lente, lenteSchema } from './schema/lente.schema';

@Module({
      imports: [
        MongooseModule.forFeature([
          {
            name: Lente.name,
            schema: lenteSchema,
          },
        ]),
      ],
  controllers: [LenteController],
  providers: [LenteService],
    exports: [LenteService],
})
export class LenteModule {}
