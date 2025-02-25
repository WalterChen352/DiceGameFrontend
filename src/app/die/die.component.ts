// die.component.ts
import { Component, EventEmitter, Output, Input, OnInit, input } from '@angular/core';
import {Die} from '../interfaces/die.interface'


@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent  implements OnInit{
  //@Input() die:any;
  @Input() faceIndex: number|null=null;
  @Input() faces:any=[];
  @Input()selected: boolean|undefined=false;
  hover:boolean=false;
  @Input() display:boolean=false;
  @Input() index:number=0;
  @Input() frozen:boolean=false;
  @Output() selectedFace=new EventEmitter<any>();
  name:string=''

  ngOnInit(): void {
  }

  toggleSelect():boolean{
    this.selected=!this.selected;
    return this.selected;
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

  setFaces(faces:any):void{
      this.faces=faces;
  }
  setName(name:any):void{
    
    this.name=name;
    console.log('setting name', this.name)
  }

  setFaceIndex(index:number):void{
    this.faceIndex=index;
  }
  
  selectFaceUp():void{
    console.log('selecting face up in die component');
    this.selectedFace.emit({
      'faceIndex': this.faceIndex,
      'dieIndex': this.index
    });
  }
  selectFace(faceIndex:number):void{
    console.log('selecting face in die component');
    if(this.faceIndex !== null){
      this.selectedFace.emit({
        'faceIndex': faceIndex,
        'dieIndex': this.index
      });
    }
    
  }

  toggleFaceSelect(index:number):boolean{
    console.log('settingFaceSElect')
    this.faces[index].selected=!this.faces[index].selected;
    return this.faces[index].selected;
  }

  isFaceSelected(index:number):boolean{
    return this.faces[index].selected
  }

  setFrozen(frozen:boolean):void{
    this.frozen=frozen;
    if(this.frozen){
      console.log('frozen die', this.index)
    }

  }
  logNgClass(classes: any): void {
    console.log('ngClass:', classes);
  }

}

console.log('miri was here :3')