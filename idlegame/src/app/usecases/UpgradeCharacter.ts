import { Character } from "../../domain/Character";
import { ICharacterRepository } from "../ports/ICharacterRepository";

export class UpgradeCharacter {
    constructor(private characterRepo: ICharacterRepository) {}

    async execute(): Promise<{ success: boolean; character: Character }> {
        const character = await this.characterRepo.getCharacter(1);
        if (!character) throw new Error("Character not found");
        const success = character.upgrade();
        await this.characterRepo.saveCharacter(character);
        return { success, character };
    }
}
