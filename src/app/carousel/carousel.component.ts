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
      this.socket.onEvent('PlayersDiceInfo', data=>
        {
          console.log(data)
          this.players = Object.values(data).map(diceArray => {
            let player = new OppDiceContainerComponent(this.socket);
            player.dice = diceArray as Die[];
            return player;
          });
          console.log(this.players);
        });
  }
}
