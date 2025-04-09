import { Module } from '@nestjs/common';
import { DetalleLenteService } from './detalleLente.service';
import { DetalleLenteController } from './detalleLente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DetalleLente, detalleLenteSchema } from './schema/detalleLente.schema';

@Module({
  imports: [
        MongooseModule.forFeature([
          {
            name: DetalleLente.name,
            schema: detalleLenteSchema,
          },
        ]),
      ],
  controllers: [DetalleLenteController],
  providers: [DetalleLenteService],
})
export class DetalleLenteModule {}
