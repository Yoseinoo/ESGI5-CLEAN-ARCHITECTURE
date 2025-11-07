import { Character } from "./Character";
import { Enemy } from "./Enemy";

export class Battle {
    static fight(character: Character, enemy: Enemy): { win: boolean; earned: number } {
        // Character hits first
        enemy.takeDamage(character.attack);

        // If enemy survives, it hits back
        if (!enemy.isDead()) {
            character.takeDamage(enemy.attack);
        }

        const win = enemy.isDead();

        if (win) {
            character.gold += enemy.reward;
        }

        return { win, earned: win ? enemy.reward : 0 };
    }
}

