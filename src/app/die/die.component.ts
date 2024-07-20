// die.component.ts
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent {
  @Input() faces: string[]=[];
  @Input() faceIndex: number|null= null;
  @Input() selected: boolean=false;
  hover:boolean=false;

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
