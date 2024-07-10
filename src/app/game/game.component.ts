import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  face =0;
  quantity =0;
  playerTurn=false;
  prevPlayer='';
  prevQuantity=0;
  prevFace=0;
  challenge =false
  constructor(private authService: AuthService, private router: Router, private socket: SocketService) {}

  ngOnInit(): void {
      this.socket.onEvent('GetBid', (data)=>{
        this.playerTurn=true;
      })
      this.socket.onEvent('BidAcknowledge', ()=>{
        this.playerTurn=false;
      })
      this.socket.onEvent('PlayerBid', (data)=>{
        console.log(data)
        this.prevFace=data['prevFace']
        this.prevPlayer=data['prevPlayer']
        this.prevQuantity=data['prevQuantity']
      })
      this.socket.onEvent('LoseDie', ()=>console.log('losing die'))
  }

  submitBid():void{
    if(this.challenge){
      console.log('challenge selected')
      this.socket.emit('challengeBid', {
        'username': localStorage.getItem('user')
      })
    }
    else{
      this.socket.emit('sendBid', {
        'username': localStorage.getItem('user'),
        'quantity': this.quantity,
        'face': this.face
      })
    }
  }
}
