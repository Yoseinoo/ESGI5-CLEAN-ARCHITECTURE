import { UpgradeCharacterAttack } from "../UpgradeCharacterAttack";
import { Character } from "../../../domain/Character";
import { ICharacterRepository } from "../../ports/ICharacterRepository";

const mockRepo: ICharacterRepository = {
    getCharacter: jest.fn(),
    saveCharacter: jest.fn(),
    resetCharacter: function (): Promise<Character> {
        throw new Error("Function not implemented.");
    }
};

describe("UpgradeCharacterAttack Use Case", () => {
    beforeEach(() => jest.clearAllMocks());

    it("should upgrade attack if character has enough gold", async () => {
        const char = new Character("Hero", 1, 100, 100, 50, 100); // id, name, maxHp, hp, attack, gold
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(char);

        const useCase = new UpgradeCharacterAttack(mockRepo);
        const result = await useCase.execute();

        expect(result.success).toBe(true);
        expect(mockRepo.saveCharacter).toHaveBeenCalledWith(result.character);
    });

    it("should fail if character does not have enough gold", async () => {
        const char = new Character("Hero", 1, 100, 100, 50, 0);
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(char);

        const useCase = new UpgradeCharacterAttack(mockRepo);
        const result = await useCase.execute();

        expect(result.success).toBe(false);
        expect(mockRepo.saveCharacter).toHaveBeenCalledWith(result.character);
    });

    it("should throw an error if character not found", async () => {
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(null);

        const useCase = new UpgradeCharacterAttack(mockRepo);
        await expect(useCase.execute()).rejects.toThrow("Character not found");
        expect(mockRepo.saveCharacter).not.toHaveBeenCalled();
    });
});
