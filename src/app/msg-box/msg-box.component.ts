import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-msg-box',

  templateUrl: './msg-box.component.html',
  styleUrl: './msg-box.component.css'
})
export class MsgBoxComponent implements OnInit {
  msgs:string[]=[]
  constructor(private socket:SocketService){}

  ngOnInit(): void {
      this.socket.onEvent('message', (msg)=>this.msgs.push(msg))
  }
}
