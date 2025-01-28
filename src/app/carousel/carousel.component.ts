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
  dieType:string='';
  maxSelections:number=0;
  minSelections:number=0;
  prompt:string=''
  res:string=''
  user:string|null = ''
  selections:number[][]=[]
  promptQueue:any[]=[]
  promptResponses:any[]=[]
  promptIndex:number=0;

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
      this.socket.onEvent('Prompt', (prompts)=>{
        this.prompted=true;
        this.promptIndex=0;
        prompts.forEach((prompt:any)=>{
          let p:any;
          p.prompt=prompt['prompt'];
          p.minSelections=prompt['minSelections'];
          p.maxSelections=prompt['maxSelections'];
          p.targetType=prompt['targetType'];
          p.dieType=prompt['dieType'];
          this.promptQueue.push(p);
        });
        this.nextPrompt();
      }
      )
  }

  

  selectDie(data:any):void{
    console.log('select die in carousel component');
    //if(true){
    const pid=data['player'];
    const dieIndex=data['index'];
    let index=-1;
    if(this.prompted && this.targetType==='die'){
      console.log('selected die ' + data['index'] +' from '+ data['player']);
      const player = this.players.find((p, i)=>{
        if(p.pid===pid){
          index = i;
          return true;
        }
        return false;
      });
      console.log(player);
      if(player){
        console.log(player.constructor.name);
        let die = player.dice[data['index']];
        if(die.toggleSelect()){
          this.selections.push([index, dieIndex]);
        }
        else{
          this.selections=this.selections.filter((selection)=>{
            console.log('filtering', selection, 'against', index, dieIndex);
            return !(selection[0]===index && selection[1]===dieIndex)
          })
        }
        console.log('new dice selections are ', this.selections);
      }
    }
  }

  selectPlayer(pid:string|null){
    console.log('carousel selecting')
    let index:number=-1;
    if(pid){
      console.log('selecting '+ pid);
      console.log(this.players);
      let player= this.players.find((p, i)=>{
        if(p.pid===pid){
          index = i;
          return true;
        }
        return false;
      })
      console.log(player);
      if(player?.toggleSelectPlayer()){
        this.selections.push([index]);
      }
      else{
        this.selections=this.selections.filter((selection:any)=>selection !== index)
      }
      
      console.log('new selections are now ', this.selections);
    }
  }

  unselectAll():void{
    let playerIndex=-1;
    let dieIndex=-1;
    let faceIndex=-1;
    this.selections.forEach((selection)=>{
        switch(selection.length){
          case 1:
            playerIndex=selection[0];
            this.players[playerIndex].toggleSelectPlayer();
            break;
          case 2:
            playerIndex=selection[0];
            dieIndex=selection[1];
            this.players[playerIndex].dice[dieIndex].toggleSelect();
            break;
          case 3:
            playerIndex=selection[0];
            dieIndex=selection[1];
            faceIndex=selection[2];
            this.players[playerIndex].dice[dieIndex].toggleFaceSelect(faceIndex);
        }
    })
    this.selections=[]
    console.log('cleared selections', this.selections)
  }


  submit():void{
    //submitting
    if (this.maxSelections<= this.selections.length && this.selections.length >= this.minSelections){
        this.promptResponses.push(this.selections);
        console.log('submitting ', this.selections, this.promptResponses);
        this.selections=[];
        this.nextPrompt();
    }
    else{
      console.warn('not enough targets')
    }
    
}

  currPlayer(): boolean | undefined{
    if (this.players.length>0 && this.players[this.currentIndex])
      return this.players[this.currentIndex].pid === localStorage.getItem('user')
    else return undefined
  }

  nextPrompt():void{
    if(this.promptIndex< this.promptQueue.length){
      const i=this.promptIndex;
      const p = this.promptQueue[i];
      this.prompt=p.prompt;
      this.minSelections=p.minSelections;
      this.maxSelections=p.maxSelections;
      this.targetType=p.targetType;
      this.dieType=p.dieType;
      this.promptIndex++;
    }
    else{
      console.warn('calling next prompt at end of prompt queue');
    }
  }

  selectFace(data:any):void{
    console.log('carousel has received face selection', data);
    const pid = data['pid'];
    const faceIndex= data['faceIndex'];
    const dieIndex= data['dieIndex'];
    let index=-1;
    let player= this.players.find((p, i)=>{
        if(p.pid===pid){
          index = i;
          return true;
        }
        return false;
      });
    console.log(player);
    if(player){
      if(player.dice[dieIndex].toggleFaceSelect(faceIndex)){
        this.selections.push([index, dieIndex, faceIndex]);
      }
      else{
        this.selections=this.selections.filter((selection:any)=>{
          return !(selection[0]===index && selection[1]===dieIndex && selection[2]===faceIndex); 
        })
      }
      console.log('face selecitons', this.selections);
    }
  }
}
