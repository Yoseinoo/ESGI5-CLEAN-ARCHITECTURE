import { CharacterRepository } from "../../frameworks/CharacterRepository";
import { Character } from "../../domain/Character";

export class ResetCharacter {
    constructor(private repo: CharacterRepository) {}

    async execute(): Promise<{ character: Character }> {
        const char = await this.repo.resetCharacter();
        return { character: char };
    }
}
