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
  onEvent(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  emit(event: string, msg: any) {
    this.socket.emit(event, msg);
  }
}
