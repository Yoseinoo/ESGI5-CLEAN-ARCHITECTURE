import { Character } from "./Character";
import { Enemy } from "./Enemy";

export class Battle {
  static fight(character: Character, enemy: Enemy): { win: boolean; earned: number } {
    const win = character.attack >= enemy.hp;
    if (win) character.gold += enemy.reward;
    return { win, earned: win ? enemy.reward : 0 };
  }
}
