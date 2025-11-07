import { Character } from "../../domain/Character";
import { ICharacterRepository } from "../ports/ICharacterRepository";

export class GetCharacter {
    constructor(private characterRepo: ICharacterRepository) {}

    async execute(): Promise<Character | null> {
        return this.characterRepo.getCharacter(1);
    }
}
