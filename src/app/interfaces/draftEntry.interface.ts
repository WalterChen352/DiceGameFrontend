import { Die } from "./die.interface";

export interface DraftEntry{
    drafted: boolean;
    dice: Die[];
    player: string|null;
    name: string
}