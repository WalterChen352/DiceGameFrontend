// die.component.ts
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent {
  @Input() faces: string[]=[];
  @Input() faceIndex: number=0;
  @Input() selected: boolean=false;

  toggleSelect():void{
    this.selected=!this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }
}
