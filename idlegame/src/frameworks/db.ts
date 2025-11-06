// src/frameworks/db.ts
import Dexie, { Table } from "dexie";
import { Character } from "../domain/Character";

export interface CharacterRecord {
    id?: number;
    name: string;
    level: number;
    attack: number;
    gold: number;
}

export class GameDB extends Dexie {
    characters!: Table<CharacterRecord, number>;

    constructor() {
        super("IdleGameDB");
        this.version(1).stores({
            characters: "++id,name,level,attack,gold",
        });
    }
}

// Export a singleton
export const db = new GameDB();
