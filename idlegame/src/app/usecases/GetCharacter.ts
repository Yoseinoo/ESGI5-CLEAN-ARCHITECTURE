import { CharacterRepository } from "../../frameworks/CharacterRepository";
import { Character } from "../../domain/Character";

export class GetCharacter {
    constructor(private characterRepo: CharacterRepository) {}

    async execute(): Promise<Character | null> {
        return this.characterRepo.getCharacter(1);
    }
}
