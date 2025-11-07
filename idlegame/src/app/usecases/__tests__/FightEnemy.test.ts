// src/app/usecases/__tests__/FightEnemy.test.ts
import { FightEnemy } from "../FightEnemy";
import { Character } from "../../../domain/Character";
import { Enemy } from "../../../domain/Enemy";
import { ICharacterRepository } from "../../ports/ICharacterRepository";
import { Battle } from "../../../domain/Battle";

class InMemoryCharacterRepo implements ICharacterRepository {
    private character = new Character("Knight", 1, 100, 10, 0);
    async getCharacter(id: number) {
        return this.character;
    }
    async saveCharacter(character: Character) {
        this.character = character;
    }
    resetCharacter(): Promise<Character> {
        throw new Error("Method not implemented.");
    }
}

jest.mock("../../../domain/Battle", () => ({
    Battle: { fight: jest.fn() },
}));

describe("FightEnemy Use Case", () => {
    let repo: InMemoryCharacterRepo;
    let useCase: FightEnemy;

    beforeEach(() => {
        repo = new InMemoryCharacterRepo();
        useCase = new FightEnemy(repo);
        (Battle.fight as jest.Mock).mockReset();
    });

    it("should win if character is stronger", async () => {
        const enemy = new Enemy(1, "Goblin", 5, 2, 10);
        (Battle.fight as jest.Mock).mockReturnValue({ win: true, earned: 10 });

        const result = await useCase.execute(enemy);

        expect(result.win).toBe(true);
        expect(result.earned).toBe(10);
        expect(result.character).toBeInstanceOf(Character);
    });
});
