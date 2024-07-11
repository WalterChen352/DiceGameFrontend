import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import { Die } from '../interfaces/die.interface';
import { DieComponent } from '../die/die.component';

@Component({
  selector: 'app-diceContainer',
  templateUrl: './diceContainer.component.html',
  styleUrls: ['./diceContainer.component.css']
})
export class DiceContainerComponent implements OnInit {
  dice: Die[] = [];
  prompted = false;
  maxSelections = 0;
  prompt=''
  res=''

  @ViewChildren(DieComponent) dieComponents!: QueryList<DieComponent>;

  constructor(private authService: AuthService, private router: Router, private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.onEvent('DiceRolls', (data) => {
      this.dice = data['dice'];
    });
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

  selectDice(index: number): void {
    const dieComponent = this.dieComponents.toArray()[index];
    const selectedCount = this.dieComponents.filter(die => die.selected).length;

    if (dieComponent.selected) {
      dieComponent.setSelected(false);
    } else if (selectedCount < this.maxSelections) {
      dieComponent.setSelected(true);
    } else {
      console.log(`Maximum of ${this.maxSelections} dice can be selected.`);
    }
  }

  unselectAllDice() :void{
    this.dieComponents.map(die=>die.setSelected(false));
  }
}
