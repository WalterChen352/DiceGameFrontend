import { DieComponent } from "../die/die.component";
import { Die } from "./die.interface"

export interface DiceContainer{
    dice:DieComponent[];
    pid:string|null;
    select(index:number):void
}