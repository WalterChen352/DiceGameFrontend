import { Component, OnInit } from '@angular/core';
import {DraftEntry} from '../interfaces/draftEntry.interface'
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-draft-manager',
  standalone: false,
  templateUrl: './draft-manager.component.html',
  styleUrl: './draft-manager.component.css'
})
export class DraftManagerComponent implements OnInit {
  Entries: DraftEntry[]=[];
  constructor(private socket: SocketService){}

  ngOnInit(): void {
      this.socket.onEvent('draftUpdate', (data)=>{
        console.log(data);
      })

      this.socket.onEvent('DraftInfo', (data:DraftEntry[])=>{
        console.log(data);
        this.Entries=data;
      })
  }
}
