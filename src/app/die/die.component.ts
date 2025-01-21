// die.component.ts
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import {Die} from '../interfaces/die.interface'

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent  implements OnInit{
  @Input() die:Die ={} as Die;
  selected: boolean=false;
  hover:boolean=false;
  @Input() display:boolean=false;
  ngOnInit(): void {
  }

  toggleSelect():void{
    this.selected=!this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }

  displayFaces():void{
    this.hover=true;
  }

  hideFaces():void{
    this.hover=false;
  }
  
}
