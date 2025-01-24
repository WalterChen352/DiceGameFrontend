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
  face :number=0;
  quantity : number=0;
  playerTurn: boolean=false;
  prevPlayer:string='';
  prevQuantity :number=0;
  prevFace : number =0;
  challenge:boolean =false
  phase:string=''
  constructor(private authService: AuthService, private router: Router, private socket: SocketService) {}

  ngOnInit(): void {
      const uid = localStorage.getItem('user')
      //send ping to server to ask if in game
      this.socket.emit('Init', {
        'uid': uid
      });
      // returns to lobby if not in game
      this.socket.onEvent('NotInGame', ()=>{
        this.router.navigate(['/lobby']);
      });

      this.socket.onEvent('GetBid', (data)=>{
        this.face=this.prevFace;
        this.quantity=this.prevQuantity;
        this.playerTurn=true;
      });
      this.socket.onEvent('BidAcknowledge', ()=>{
        this.playerTurn=false;
        this.challenge=false;
      });
      this.socket.onEvent('PlayerBid', (data)=>{
        console.log(data)
        this.prevFace=data['prevFace']
        this.prevPlayer=data['prevPlayer']
        this.prevQuantity=data['prevQuantity']
      });
      this.socket.onEvent('LoseDie', ()=>console.log('losing die'));
      this.socket.onEvent('RoundStart', ()=>{
        this.prevPlayer='';
        this.phase='bid';
      });

      this.socket.onEvent('Draft',()=>{
        console.log('draft start')
        this.phase='draft'
      });

      this.socket.onEvent('PostPowers',(data)=>{
        return console.log(data);
      });
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
