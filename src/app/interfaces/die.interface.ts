// die.interface.ts
import {Face} from './face.interface'

export interface Die {
    faces: Face[];
    faceIndex: number|null;
    setSelected(selected: boolean): void;
  }
  