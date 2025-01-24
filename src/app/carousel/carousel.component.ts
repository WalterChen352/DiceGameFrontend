import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { DiceContainerComponent } from '../diceContainer/diceContainer.component';
import {DiceContainer} from '../interfaces/diceContainer.interface'
import {Die} from '../interfaces/die.interface'
import { DieComponent } from '../die/die.component';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  players: DiceContainerComponent[] = [];
  currentIndex: number = 0;
  prompted:boolean =false;
  targetType:string='';
  maxSelections:number=0;
  minSelections:number=0;
  prompt:string=''
  res:string=''
  user:string|null = ''
  selections=[]

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
      this.socket.onEvent('PlayersDiceInfo', (data:DiceContainerComponent[])=>
        {
          console.log('receiving player diceinfo')
          console.log(data)
          this.players=[]
          data.forEach(player => {
            let p = new DiceContainerComponent(this.socket);
            let dice:DieComponent[]=[];
            // player.dice.forEach((die)=>{
            //   dice.push(new DieComponent(die['faces'], die['faceIndex']));
            // })
            console.log(p.constructor.name)
            p.setDice(player.dice);
            console.log(p.dice)
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
        if(user){
          console.log(data['dice'], 'this is setting dice rolls')
          user.setDice(data['dice'])
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

  submit():void{
      switch(this.targetType){
        case 'player':

        case 'die':
        case 'face':
        default:
          return
      }
      if (this.maxSelections<= this.selections.length && this.selections.length >= this.minSelections){
          //submit to server
      }
  }

  selectDie(data:any):void{
      if(true){
    // if(this.prompted && this.targetType==='die'){
      console.log('selected die ' + data['index'] +' from '+ data['player']);
      const player = this.players.find(player =>player.pid===data['player']);
      console.log(player);
      //TODO add logic here
      if(player){
        console.log(player.constructor.name);
        let die = player.dice[data['index']];
        console.log(die);
        console.log(Object.getOwnPropertyNames(die));
        console.log(die.constructor.name);
        die.toggleSelect();
      }
    }
  }

  selectPlayer(pid:string|null){
    console.log('carousel selecting')
    if(pid){
      console.log('selecting '+ pid);
      console.log(this.players);
      let player= this.players.find((p)=>{
        return p.pid===pid
      })
      console.log(player);
      player?.selectPlayer();
    }
  }

  unselectAll():void{
    switch(this.targetType){
      case 'player':
      case 'die':
      case 'face':
      default:
        return
    }
  }

  currPlayer(): boolean | undefined{
    if (this.players.length>0 && this.players[this.currentIndex])
      return this.players[this.currentIndex].pid === localStorage.getItem('user')
    else return undefined
  }
}
