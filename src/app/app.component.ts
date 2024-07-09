import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private socketService: SocketService) {
    this.socketService.message.subscribe((msg: string) => {
      console.log(msg);
    });
  }

  sendMessage(msg: string) {
    this.socketService.sendMessage(msg);
  }

  emit(event: string, msg: string) {
    this.socketService.emit(event, msg);
  }
}
