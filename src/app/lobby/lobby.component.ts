import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  inLobby= false;
  startingDice=6;
  gameCode='';
  players=[]
  constructor(private authService: AuthService, private router: Router, private socket: SocketService) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    else{
      this.socket.onEvent('joinGame', (response)=>{
        console.log(response)
        this.gameCode=response
        this.inLobby=true}
    );
      this.socket.onEvent('leaveGame', ()=>{
        this.inLobby=false; 
        this.gameCode=''
        this.startingDice=6;
      })
      this.socket.onEvent('lobbyUpdate', (data)=>{
        this.players=data
      });
      this.socket.onEvent('joinError', (msg)=>console.log(msg));
      this.socket.onEvent('startGame',()=>this.router.navigate(['/game']));
    }
  }

  makeGame():void{
    this.socket.emit('makeGame', {'lives': this.startingDice,
      'username': localStorage.getItem('user')
    })
    console.log('making game with '+this.startingDice);
  }

  startGame(): void {
    this.socket.emit('startGame', {
      'username': localStorage.getItem('user')
    })
  }

  joinGame():void{
    this.socket.emit('joinGame', {
      'username': localStorage.getItem('user'),
      'room': this.gameCode
    });
  }

  leaveGame():void{
    this.socket.emit('leaveGame',{
      'username': localStorage.getItem('user')
    })
  }
}
