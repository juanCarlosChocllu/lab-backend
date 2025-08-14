import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { AutenticacionDto } from './dto/Autenticacion.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as argon2 from 'argon2';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/core/config/AppConfigService';

@Injectable()
export class AutenticacionService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}
  async auntenticacion(autenticacionDto: AutenticacionDto) {
    try {
      const usuario = await this.usuarioService.buscarUsuario(
        autenticacionDto.username,
      );
      if (!usuario) {
        throw new ForbiddenException();
      }
      const match = await argon2.verify(
        usuario.password,
        autenticacionDto.password,
      );
      if (!match) {
        throw new ForbiddenException();
      }
      const token = this.generarToken(usuario._id);
      return { token: token };
    } catch (error) {
      throw error;
    }
  }

  private generarToken(id: Types.ObjectId) {
    const token = this.jwtService.sign(
      { id: id },
      {
        secret: this.appConfigService.jwtSecret,
        expiresIn: '4h',
      },
    );
    return token;
  }
}
