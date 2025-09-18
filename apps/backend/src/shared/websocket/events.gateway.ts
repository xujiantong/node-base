import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';
import { log } from 'console';
import { Socket, Server } from 'socket.io';
import { LoggerService } from '@/shared/logger/logger.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class EventsGateway {
  constructor(private logger: LoggerService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any, @ConnectedSocket() client: Socket): any {
    this.logger.log(`events: data=${JSON.stringify(data)}`);
    client.emit('events', 'websocket pong');
  }
  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket
  ): any {
    this.logger.log(`events: data=${JSON.stringify(data)}`);
    client.emit('events', { data: 1, message: 'Servier return you ' });
  }

  // 以下是三个 WebSocketGateway生命周期hook
  afterInit() {
    console.log('OnGatewayInit');
  }

  handleConnection(client: Socket) {
    // Socket.io 握手信息
    const handshake = client.handshake;
    // 直接获取 IP
    const ip = handshake.address;
    // 如果有反向代理（nginx）
    const realIp =
      handshake.headers['x-forwarded-for']?.toString().split(',')[0] || ip;
    this.logger.log(`Client connected: IP=${realIp}`);
  }

  handleDisconnect() {
    console.log('OnGatewayDisconnect');
  }
}
