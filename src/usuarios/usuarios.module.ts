import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, usuariosSchema } from './schema/usuarioSchema';

@Module({
    imports: [
    MongooseModule.forFeature(
      [
        {
          name: Usuario.name,
          schema:usuariosSchema ,
        },
      ]
    ),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
