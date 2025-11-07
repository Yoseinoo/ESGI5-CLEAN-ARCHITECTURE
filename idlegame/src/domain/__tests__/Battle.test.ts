import { Battle } from "../Battle";
import { Character } from "../Character";
import { Enemy } from "../Enemy";

describe("Battle Domain", () => {
    it("character should kill enemy in one hit if attack >= enemy.hp, and not take damage back", () => {
        const character = new Character("Hero", 1, 100, 100, 10, 0);
        const enemy = new Enemy(1, "Goblin", 5, 2, 20);

        const result = Battle.fight(character, enemy);

        expect(result.win).toBe(true);
        expect(result.earned).toBe(enemy.reward);
        expect(character.gold).toBe(enemy.reward); // got reward
        expect(character.hp).toBe(100); // enemy died before counter attack
        expect(enemy.hp).toBe(0); // enemy took damage
    });

    it("enemy should attack back if it survives character attack", () => {
        const character = new Character("Hero", 1, 100, 100, 3, 0);
        const enemy = new Enemy(1, "Orc", 10, 7, 15);

        const result = Battle.fight(character, enemy);

        expect(result.win).toBe(false);
        expect(result.earned).toBe(0);
        expect(character.gold).toBe(0); // no reward
        expect(enemy.hp).toBe(7); // 10 - 3 damage from hero
        expect(character.hp).toBe(93); // 100 - 7 counter attack
    });

    it("character should die if enemy counter attack reduces hp to 0 or less", () => {
        const character = new Character("Hero", 1, 100, 6, 3, 0);
        const enemy = new Enemy(1, "Ogre", 10, 100, 50);

        const result = Battle.fight(character, enemy);

        expect(result.win).toBe(false);
        expect(result.earned).toBe(0);
        expect(character.hp).toBeLessThanOrEqual(0);
        expect(character.isDead()).toBe(true);
        expect(enemy.hp).toBe(7); // 10 - 3
    });

    it("enemy dies exactly when damage equals its hp", () => {
        const character = new Character("Hero", 1, 100, 100, 7, 0);
        const enemy = new Enemy(1, "Troll", 7, 3, 30);

        const result = Battle.fight(character, enemy);

        expect(result.win).toBe(true);
        expect(result.earned).toBe(enemy.reward);
        expect(enemy.hp).toBe(0);
        expect(character.gold).toBe(enemy.reward);
    });
});
