import { UpgradeCharacterHealth } from "../UpgradeCharacterHealth";
import { Character } from "../../../domain/Character";
import { ICharacterRepository } from "../../ports/ICharacterRepository";

describe("UpgradeCharacterHealth Use Case", () => {
    let mockRepo: ICharacterRepository;

    beforeEach(() => {
        mockRepo = {
            getCharacter: jest.fn(),
            saveCharacter: jest.fn(),
            resetCharacter: function (): Promise<Character> {
                throw new Error("Function not implemented.");
            },
        };
        jest.clearAllMocks();
    });

    it("should upgrade health if character has enough gold", async () => {
        const char = new Character("Hero", 1, 50, 50, 30, 100); // hp=50, maxHp=50, attack=30, gold=100
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(char);

        const useCase = new UpgradeCharacterHealth(mockRepo);
        const result = await useCase.execute();

        expect(result.success).toBe(true);
        expect(result.character.maxHp).toBe(70); // 50 + 20
        expect(result.character.gold).toBe(88); // 100 - 12 (level*12)
        expect(mockRepo.saveCharacter).toHaveBeenCalledWith(result.character);
    });

    it("should fail if character does not have enough gold", async () => {
        const char = new Character("Hero", 1, 50, 50, 30, 5); // gold too low
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(char);

        const useCase = new UpgradeCharacterHealth(mockRepo);
        const result = await useCase.execute();

        expect(result.success).toBe(false);
        expect(result.character.maxHp).toBe(50); // maxHp unchanged
        expect(result.character.gold).toBe(5); // gold unchanged
        expect(mockRepo.saveCharacter).toHaveBeenCalledWith(result.character);
    });

    it("should throw an error if character not found", async () => {
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(null);

        const useCase = new UpgradeCharacterHealth(mockRepo);

        await expect(useCase.execute()).rejects.toThrow("Character not found");
        expect(mockRepo.saveCharacter).not.toHaveBeenCalled();
    });
});
