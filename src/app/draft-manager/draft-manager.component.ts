import { Component, OnInit } from '@angular/core';
import {DraftEntry} from '../interfaces/draftEntry.interface'
import { SocketService } from '../socket.service';
import {Die} from '../interfaces/die.interface'
import { DieComponent } from '../die/die.component';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-draft-manager',
  standalone: false,
  templateUrl: './draft-manager.component.html',
  styleUrl: './draft-manager.component.css'
})
export class DraftManagerComponent implements OnInit {
  Entries: DraftEntry[]=[];
  PlayerTurn: boolean= false;
  Selected: number |null = null;
  constructor(private socket: SocketService){}

  ngOnInit(): void {
      this.socket.onEvent('DraftUpdate', (data)=>{
        console.log(data);
      })

      this.socket.onEvent('DraftInfo', (data:DraftEntry[])=>{
        console.log(data);
        this.Entries=data;
      })

      this.socket.onEvent('DraftTurn', ()=>{
          this.PlayerTurn=true;
      })

      this.socket.onEvent('DraftAck', ()=>{
        this.PlayerTurn=false;
      })
  }

  selectEntry(index:number):void{
    console.log("clicked on draft entry %d", index);
    if(this.PlayerTurn && !this.Entries[index].drafted){
        this.Selected=index
        this.socket.emit('DraftSelection', {
            'index': index,
            'username': localStorage.getItem('user')
        });
    }
  }
}
