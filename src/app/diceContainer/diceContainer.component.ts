import { Component, OnInit, QueryList, ViewChildren, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import { DieComponent } from '../die/die.component';

@Component({
  selector: 'app-diceContainer',
  templateUrl: './diceContainer.component.html',
  styleUrls: ['./diceContainer.component.css']
})
export class DiceContainerComponent implements OnInit, AfterViewChecked {
  @Input() dice: DieComponent[] = [];
  @Input() prompted = false;
  @Input() maxSelections = 0;
  @Input() prompt=''
  @Input() res=''
  @Input() pid: string|null=''
  @Output() dieSelected= new EventEmitter<any>();
  @Output() selectPlayerEmitter = new EventEmitter<string|null>();
  @Output() selectFaceEmitter = new EventEmitter<any>();
  private viewInitialized = false;
  @Input() playerSelected:boolean=false;
  @ViewChildren(DieComponent) dieComponents!: QueryList<DieComponent>;

  constructor( private socket: SocketService) {}

  ngOnInit() {
    console.log('Initial dieComponents', this.dieComponents);
  }
  ngAfterViewChecked() {
    if (!this.viewInitialized && this.dieComponents && this.dieComponents.length > 0) {
      this.viewInitialized = true;
      console.log('Die components initialized', this.dieComponents.length);
    }
  }
  ngAfterViewInit() {
    console.log('AfterViewInit dieComponents', this.dieComponents);
    this.dieComponents.changes.subscribe(changes => {
      console.log('DieComponents changes', changes);
    });
  }

  submitDice(): void {
    console.log('submitting dice');
    const selectedDice=this.dieComponents
      .map((die, index) => die.selected ? index : -1)
      .filter(index => index !== -1);
    console.log(selectedDice)
    if(selectedDice.length !== this.maxSelections){
      window.alert(`Please select ${this.maxSelections} dice`)
    }
    else{
      switch(this.res){
        case 'LoseDie':
          this.socket.emit(this.res, {
            'username': localStorage.getItem('user'),
            'dieIndex':selectedDice[0]
          })

      }
      this.unselectAllDice();
    }
  }

  setDice(data:any):void{
    console.log(data)
    this.dice=[];
    data.forEach((die:any)=>{
      let d = new DieComponent();
      d.setFaceIndex(die.faceIndex);
      d.setFaces(die.faces);
      d.setName(die.name);
      d.setFrozen(die.frozen);
      this.dice.push(d);
    })
    console.log(this.dice);
    console.log(this.dice[0].constructor.name);
  }

  selectDice(index: number): void {
    // const dieComponent = this.dieComponents.toArray()[index];
    // const selectedCount = this.dieComponents.filter(die => die.selected).length;

    // if (dieComponent.selected) {
    //   dieComponent.setSelected(false);
    // } else if (selectedCount < this.maxSelections) {
    //   dieComponent.setSelected(true);
    // } else {
    //   console.log(`Maximum of ${this.maxSelections} dice can be selected.`);
    // }
    this.dieSelected.emit({
      'index':index,
      'player': this.pid
    })
  }

  getUserDisplay(): string|null {
    const uid = localStorage.getItem('user');
    //console.log(uid, this.pid);
    return this.pid === uid ? 'You' : this.pid;
  }

  emitPlayer():void{
    console.log('emitting');
    this.selectPlayerEmitter.emit(this.pid);
  }

  select(index: number): void {
    if (this.dieComponents?.length > 0) {
      const dieComponent = this.dieComponents.toArray()[index];
      dieComponent.setSelected(true);
    } else {
      console.error('No die components found');
    }
  }

  toggleSelectPlayer():boolean{
    console.log('PlayerSelected');
    console.log(this.playerSelected);
    this.playerSelected=!this.playerSelected;
    console.log(this.playerSelected);
    return this.playerSelected;
  }
  

  unselectAllDice() :void{
    this.dieComponents.map(die=>die.setSelected(false));
  }

  selectFace(data:any):void{
    console.log('selecting face in dice container', data);
    data['pid']=this.pid;
    this.selectFaceEmitter.emit(data);
  }
}
