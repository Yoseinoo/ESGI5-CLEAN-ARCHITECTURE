import { Enemy } from "../../domain/Enemy";
import { Battle } from "../../domain/Battle";
import { Character } from "../../domain/Character";
import { ICharacterRepository } from "../ports/ICharacterRepository";

export class FightEnemy {
    constructor(private characterRepo: ICharacterRepository) {}

    async execute(
        enemy: Enemy
    ): Promise<{ win: boolean; earned: number; character: Character }> {
        const character = await this.characterRepo.getCharacter(1);
        if (!character) throw new Error("Character not found");

        const result = Battle.fight(character, enemy);
        await this.characterRepo.saveCharacter(character);

        return { ...result, character };
    }
}
