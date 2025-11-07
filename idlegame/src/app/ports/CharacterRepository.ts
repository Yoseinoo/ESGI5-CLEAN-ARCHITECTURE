import { Character } from "../../domain/Character";

export interface ICharacterRepository {
    getCharacter(id: number): Promise<Character | null>;
    saveCharacter(character: Character): Promise<void>;
    initDefaultCharacter(): Promise<Character>;
    resetCharacter(): Promise<Character>;
}
