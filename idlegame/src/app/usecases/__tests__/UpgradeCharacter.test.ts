import { UpgradeCharacter } from "../UpgradeCharacter";
import { Character } from "../../../domain/Character";
import { ICharacterRepository } from "../../ports/ICharacterRepository";

// In-memory repository
class InMemoryCharacterRepo implements ICharacterRepository {
    private character: Character;

    constructor(character?: Character) {
        this.character = character ?? new Character(1, "Knight", 1, 5, 20);
    }
    resetCharacter(): Promise<Character> {
        throw new Error("Method not implemented.");
    }

    async getCharacter(id: number) {
        return this.character;
    }

    async saveCharacter(character: Character) {
        this.character = character;
    }

    async initDefaultCharacter() {
        return this.character;
    }
}

describe("UpgradeCharacter Use Case", () => {
    let repo: ICharacterRepository;
    let useCase: UpgradeCharacter;

    beforeEach(() => {
        repo = new InMemoryCharacterRepo();
        useCase = new UpgradeCharacter(repo);
    });

    it("should successfully upgrade character if upgrade succeeds", async () => {
        const result = await useCase.execute();

        expect(result.success).toBe(true);
        expect(result.character.level).toBe(2); // assuming upgrade() increases level
        expect(result.character.attack).toBeGreaterThan(5); // attack increased
    });

    it("should throw error if character not found", async () => {
        const emptyRepo: ICharacterRepository = {
            getCharacter: async () => null,
            saveCharacter: async () => { },
            resetCharacter: function (): Promise<Character> {
                throw new Error("Function not implemented.");
            }
        };

        const useCaseWithEmptyRepo = new UpgradeCharacter(emptyRepo);

        await expect(useCaseWithEmptyRepo.execute()).rejects.toThrow(
            "Character not found"
        );
    });
});
