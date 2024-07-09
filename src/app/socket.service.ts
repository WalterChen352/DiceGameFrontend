import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  message = this.socket.fromEvent<string>('message');

  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  emit(event: string, msg: string) {
    this.socket.emit(event, msg);
  }
}
