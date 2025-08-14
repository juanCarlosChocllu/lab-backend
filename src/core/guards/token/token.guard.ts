import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AppConfigService } from 'src/core/config/AppConfigService';
import { Reflector } from '@nestjs/core';
import { LLAVE_PUBLICA } from 'src/core/constants/constants';
@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const publico = this.reflector.get<boolean>(
        LLAVE_PUBLICA,
        context.getHandler(),
      );
      if (publico) {
        return true;
      }
      const token: string = request.cookies['ctx'];
      if (!token) {
        throw new ForbiddenException();
      }
      const tokenVerificado = this.verificarToken(token);
      if (tokenVerificado) {
        return true;
      }
      throw new ForbiddenException();
    } catch (error) {
      throw error;
    }
  }

  private verificarToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.appConfigService.jwtSecret,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Token expirado');
      }
      throw new ForbiddenException('Token inválido');
    }
  }
}
