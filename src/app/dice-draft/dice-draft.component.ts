import { Component,Input } from '@angular/core';
import { DraftEntry } from '../interfaces/draftEntry.interface';

@Component({
  selector: 'app-dice-draft',
  templateUrl: './dice-draft.component.html',
  styleUrl: './dice-draft.component.css'
})
export class DiceDraftComponent {
  @Input() entry :DraftEntry ={} as DraftEntry;
}
