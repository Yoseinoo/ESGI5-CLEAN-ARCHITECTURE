import { CharacterRepository } from "../../frameworks/CharacterRepository";
import { Character } from "../../domain/Character";

export class UpgradeCharacter {
    constructor(private characterRepo: CharacterRepository) {}

    async execute(): Promise<{ success: boolean; character: Character }> {
        const character = await this.characterRepo.getCharacter(1);
        if (!character) throw new Error("Character not found");
        const success = character.upgrade();
        await this.characterRepo.saveCharacter(character);
        return { success, character };
    }
}
