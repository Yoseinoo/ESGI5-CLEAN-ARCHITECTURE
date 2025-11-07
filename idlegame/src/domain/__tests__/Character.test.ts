import { Character } from "../Character";

describe("Character Entity", () => {
    let char: Character;

    beforeEach(() => {
        char = new Character("Hero", 1, 50, 50, 30, 100); // name, level, maxHp, hp, attack, gold
    });

    it("should take damage correctly", () => {
        char.takeDamage(20);
        expect(char.hp).toBe(30);
        char.takeDamage(40);
        expect(char.hp).toBe(0); // cannot go below 0
        expect(char.isDead()).toBe(true);
    });

    it("should heal to full", () => {
        char.takeDamage(20);
        char.healToFull();
        expect(char.hp).toBe(char.maxHp);
    });

    it("should upgrade level, attack, maxHp", () => {
        const success = char.upgrade();
        expect(success).toBe(true);
        expect(char.level).toBe(2);
        expect(char.attack).toBe(35);
        expect(char.maxHp).toBe(60);
        expect(char.gold).toBe(90);
    });

    it("should upgrade attack separately", () => {
        const success = char.upgradeAttack();
        expect(success).toBe(true);
        expect(char.attack).toBe(40); // +10
        expect(char.gold).toBe(85); // 100 - 15
    });

    it("should upgrade health separately", () => {
        const success = char.upgradeHealth();
        expect(success).toBe(true);
        expect(char.maxHp).toBe(70); // +20
        expect(char.gold).toBe(88); // 100 - 12
    });

    it("should buy full heal", () => {
        char.takeDamage(30);
        const success = char.buyFullHeal();
        expect(success).toBe(true);
        expect(char.hp).toBe(char.maxHp);
        expect(char.gold).toBe(75); // 100 - 25
    });

    it("should fail upgrades if not enough gold", () => {
        char.gold = 5;
        expect(char.upgrade()).toBe(false);
        expect(char.upgradeAttack()).toBe(false);
        expect(char.upgradeHealth()).toBe(false);
        expect(char.buyFullHeal()).toBe(false);
    });
});
