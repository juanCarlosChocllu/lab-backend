import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Empresa, empresaSchema } from './schema/empresa.entity';

@Module({
  imports: [
        MongooseModule.forFeature([
          {
            name: Empresa.name,
            schema: empresaSchema,
          },
        ]),
      ],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}
