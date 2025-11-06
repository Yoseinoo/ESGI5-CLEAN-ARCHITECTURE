import { db, CharacterRecord } from "./db";
import { Character } from "../domain/Character";

export class CharacterRepository {
    /*
    async getCharacter(id: number): Promise<Character | null> {
        const data: CharacterRecord | undefined = await db.characters.get(id);
        if (!data) return null;
        return new Character(
            data.id!,
            data.name,
            data.level,
            data.attack,
            data.gold
        );
    }

    async saveCharacter(character: Character): Promise<void> {
        const record: CharacterRecord = {
            id: character.id,
            name: character.name,
            level: character.level,
            attack: character.attack,
            gold: character.gold,
        };
        await db.characters.put(record);
    }

    async initDefaultCharacter(): Promise<Character> {
        let char = await this.getCharacter(1);
        if (!char) {
            char = new Character(1, "Knight");
            await this.saveCharacter(char);
        }
        return char;
    }
        */
}
