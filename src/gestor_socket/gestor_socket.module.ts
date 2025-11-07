import { Module } from '@nestjs/common';
import { GestorSocketService } from './gestor_socket.service';
import { GestorSocketGateway } from './gestor_socket.gateway';

@Module({
  providers: [GestorSocketGateway, GestorSocketService],
})
export class GestorSocketModule {}
