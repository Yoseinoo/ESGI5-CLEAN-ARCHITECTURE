import Dexie from "dexie";
import { Character } from "../domain/Character";

export const db = new Dexie("IdleGameDB");

db.version(1).stores({
    characters: "++id,name,level,attack,gold",
});

export interface CharacterRecord {
    id?: number;
    name: string;
    level: number;
    attack: number;
    gold: number;
}
