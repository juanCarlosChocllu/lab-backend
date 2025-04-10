import { Module } from '@nestjs/common';
import { ColorLenteService } from './colorLente.service';
import { ColorLenteController } from './colorLente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorLente, colorLenteSchema } from './schema/colorLente.schema';

@Module({
   imports: [
        MongooseModule.forFeature([
          {
            name: ColorLente.name,
            schema: colorLenteSchema,
          },
        ]),
      ],
  controllers: [ColorLenteController],
  providers: [ColorLenteService],
})
export class ColorLenteModule {}
