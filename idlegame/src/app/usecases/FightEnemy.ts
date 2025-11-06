import { CharacterRepository } from "../../frameworks/CharacterRepository";
import { Enemy } from "../../domain/Enemy";
import { Battle } from "../../domain/Battle";
import { Character } from "../../domain/Character";

export class FightEnemy {
    constructor(private characterRepo: CharacterRepository) {}

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
