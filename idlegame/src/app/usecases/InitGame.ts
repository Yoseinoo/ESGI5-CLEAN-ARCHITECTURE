import { Character } from "../../domain/Character";
import { ICharacterRepository } from "../ports/ICharacterRepository";

export class InitGame {
    constructor(private characterRepo: ICharacterRepository) {}

    async execute(): Promise<Character> {
        let char = await this.characterRepo.getCharacter(1);
        if (!char) {
            char = new Character(1, "Knight");
            await this.characterRepo.saveCharacter(char);
        }
        return char;
    }
}