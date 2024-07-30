import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { OppDiceContainerComponent } from '../oppDiceContainer/diceContainer.component';
import {DiceContainer} from '../interfaces/diceContainer.interface'
import {Die} from '../interfaces/die.interface'


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  players: DiceContainer[] = [];
  currentIndex: number = 0;
  prompted =false;
  maxSelections=0;
  prompt=''
  res=''
  user:string|null = ''

  constructor(private socket: SocketService){}

  prev():void {
    console.log('prev player')
    this.currentIndex = (this.currentIndex === 0) ? this.players.length - 1 : this.currentIndex - 1;
    console.log('prev player' + this.currentIndex)
  }

  next():void {
    
    this.currentIndex = (this.currentIndex === this.players.length - 1) ? 0 : this.currentIndex + 1;
    console.log('next player ' + this.currentIndex)
  }

  ngOnInit(): void {
      this.user=localStorage.getItem('user')
      this.socket.onEvent('PlayersDiceInfo', (data:OppDiceContainerComponent[])=>
        {
          console.log(data)
          this.players=[]
          data.forEach(player => {
            let p = new OppDiceContainerComponent(this.socket);
            p.dice = player.dice as Die[]
            p.pid= player.pid
            this.players.push(p);
          });
          console.log(this.players);
        });
      this.socket.onEvent('DiceRolls', (data)=>{
        console.log(localStorage.getItem('user'))
        let user =this.players.find(player=>{
          return player.pid === localStorage.getItem('user');
        })
        this.players.forEach(player=>console.log(player.pid))
        console.log(0 !== null)
        if(user){
          console.log(data['dice'], 'this is setting dice rolls')
          user.dice=data['dice']
        }
        else{
          console.log('error, user not found')
        }
      })
      this.socket.onEvent('LoseDie', (msg)=>{
        this.res='LoseDie'
        this.prompted=true;
        this.prompt=msg;
        this.maxSelections=1;
      })
      this.socket.onEvent('LoseDieAck',()=>{
        this.prompted=false;
        this.maxSelections=0;
      })
  }

  currPlayer(): boolean | undefined{
    if (this.players.length>0 && this.players[this.currentIndex])
      return this.players[this.currentIndex].pid === localStorage.getItem('user')
    else return undefined
  }
}
