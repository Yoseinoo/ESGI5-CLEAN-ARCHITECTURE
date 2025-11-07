import { Battle } from "../Battle";
import { Character } from "../Character";
import { Enemy } from "../Enemy";

describe("Battle Domain", () => {
    it("should win if character.attack >= enemy.hp", () => {
        const character = new Character(1, "Hero", 1, 10, 0);
        const enemy = new Enemy(1, "Goblin", 5, 2, 20);

        const result = Battle.fight(character, enemy);

        expect(result.win).toBe(true);
        expect(result.earned).toBe(enemy.reward);
        expect(character.gold).toBe(enemy.reward); // gold updated
    });

    it("should lose if character.attack < enemy.hp", () => {
        const character = new Character(1, "Hero", 1, 5, 0);
        const enemy = new Enemy(1, "Orc", 10, 3, 15);

        const result = Battle.fight(character, enemy);

        expect(result.win).toBe(false);
        expect(result.earned).toBe(0);
        expect(character.gold).toBe(0); // gold unchanged
    });

    it("should not modify enemy object", () => {
        const character = new Character(1, "Hero", 1, 10, 0);
        const enemy = new Enemy(1, "Goblin", 5, 2, 20);

        const originalHP = enemy.hp;
        Battle.fight(character, enemy);
        expect(enemy.hp).toBe(originalHP); // enemy HP unchanged
    });

    it("should handle edge case: attack equals hp", () => {
        const character = new Character(1, "Hero", 1, 7, 0);
        const enemy = new Enemy(1, "Troll", 7, 3, 30);

        const result = Battle.fight(character, enemy);

        expect(result.win).toBe(true);
        expect(result.earned).toBe(enemy.reward);
        expect(character.gold).toBe(enemy.reward);
    });
});
