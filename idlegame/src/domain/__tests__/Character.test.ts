import { Character } from "../Character";

describe("Character Domain", () => {
    it("should upgrade if enough gold", () => {
        const char = new Character("Hero", 1, 100, 100, 30, 20); // level 1, gold 20

        const success = char.upgrade();

        expect(success).toBe(true);
        expect(char.level).toBe(2);
        expect(char.attack).toBe(50); // 30 + 20
        expect(char.gold).toBe(10);   // spent 10 gold (level * 10)
    });

    it("should not upgrade if not enough gold", () => {
        const char = new Character("Hero", 1, 100, 100, 30, 5); // level 1, gold 5

        const success = char.upgrade();

        expect(success).toBe(false);
        expect(char.level).toBe(1);
        expect(char.attack).toBe(30);
        expect(char.gold).toBe(5); // unchanged
    });

    it("should calculate upgrade cost correctly", () => {
        const char = new Character("Hero", 1, 100, 100, 30, 50);

        expect(char.getUpgradeCost()).toBe(10); // level 1 -> 10
        char.level = 5;
        expect(char.getUpgradeCost()).toBe(50); // level 5 -> 50
    });

    it("multiple upgrades work correctly", () => {
        const char = new Character("Hero", 1, 100, 100, 30, 100);

        let success = char.upgrade(); // level 1 -> 2
        expect(success).toBe(true);
        expect(char.level).toBe(2);
        expect(char.attack).toBe(50);
        expect(char.gold).toBe(90); // 100 - 10

        success = char.upgrade(); // level 2 -> 3
        expect(success).toBe(true);
        expect(char.level).toBe(3);
        expect(char.attack).toBe(70);
        expect(char.gold).toBe(70); // 90 - 20

        success = char.upgrade(); // level 3 -> 4
        expect(success).toBe(true);
        expect(char.level).toBe(4);
        expect(char.attack).toBe(90);
        expect(char.gold).toBe(40); // 70 - 30
    });
});
