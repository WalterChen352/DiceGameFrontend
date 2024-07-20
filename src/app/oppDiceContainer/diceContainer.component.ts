import { Component, Input, OnInit, QueryList, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import { Die } from '../interfaces/die.interface';
import { DieComponent } from '../die/die.component';

@Component({
  selector: 'app-oppDiceContainer',
  templateUrl: './diceContainer.component.html',
  styleUrls: ['./diceContainer.component.css']
})
export class OppDiceContainerComponent implements OnInit, OnChanges {
  @Input()dice: Die[] = [];

  //@ViewChildren(DieComponent) dieComponents!: QueryList<DieComponent>;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    return
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dice']) {
      console.log('Dice input changed:', this.dice);
    }
  }


}
