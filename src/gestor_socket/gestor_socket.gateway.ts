import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { GestorSocketService } from './gestor_socket.service';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({cors:'http://localhost:5173'})
export class GestorSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;
  constructor(private readonly gestorSocketService: GestorSocketService) {}

  handleConnection(cliente: Socket) {
    console.log('Cliente conectado', cliente.id);
  }
  handleDisconnect(cliente: Socket) {
    console.log('Cliente desconectado', cliente.id);
  }
  @OnEvent('notificacion.sincronizacion')
  notificacionesDescarga(data: { mensaje: string }) {
    return this.server.emit('notificaciones', data.mensaje);
  }
}
