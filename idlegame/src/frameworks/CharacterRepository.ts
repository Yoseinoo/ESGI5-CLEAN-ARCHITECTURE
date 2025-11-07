import { db, CharacterRecord } from "./db";
import { Character } from "../domain/Character";
import { ICharacterRepository } from "../app/ports/ICharacterRepository";

export class CharacterRepository implements ICharacterRepository {
    async getCharacter(id: number): Promise<Character | null> {
        const data = await db.characters.get(id);
        if (!data) return null;
        return new Character(
            data.name,
            data.level,
            data.maxHp,
            data.hp,
            data.attack,
            data.gold
        );
    }

    async saveCharacter(character: Character): Promise<void> {
        const record: CharacterRecord = {
            id: character.id,
            name: character.name,
            level: character.level,
            maxHp: character.maxHp,
            hp: character.hp,
            attack: character.attack,
            gold: character.gold,
        };
        await db.characters.put(record);
    }

    async resetCharacter(): Promise<Character> {
        // Create a fresh character with default stats
        const char = new Character("Knight"); // Level 1, default attack, default gold
        await this.saveCharacter(char); // save it to DB
        return char;
    }
}
