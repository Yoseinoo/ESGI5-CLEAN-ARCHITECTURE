import { Character } from "../../domain/Character";
import { ICharacterRepository } from "../ports/CharacterRepository";

export class ResetCharacter {
    constructor(private repo: ICharacterRepository) {}

    async execute(): Promise<{ character: Character }> {
        const char = await this.repo.resetCharacter();
        return { character: char };
    }
}
