import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.css'
})
export class DiceComponent implements OnInit {
  faceup=[];
  dice=[];
  playerTurn=false;
  face=0;
  quantity=0;
  constructor(private authService: AuthService, private router: Router, private socket: SocketService) {}

  ngOnInit(): void {
      this.socket.onEvent('GetBid', (data)=>{
        this.playerTurn=true;
      })
      this.socket.onEvent('BidAcknowledge', ()=>{
        this.playerTurn=false;
      })
  }

  submitBid():void{
    this.socket.emit('sendBid', {
      'username': localStorage.getItem('user'),
      'quantity': this.quantity,
      'face': this.face
    })
  }
}
