import { BuyCharacterHeal } from "../BuyCharacterHeal";
import { Character } from "../../../domain/Character";
import { ICharacterRepository } from "../../ports/ICharacterRepository";

describe("BuyCharacterHeal Use Case", () => {
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

    it("should heal character to full if enough gold", async () => {
        const char = new Character("Hero", 1, 50, 20, 30, 100); // hp=20/50, gold=100
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(char);

        const useCase = new BuyCharacterHeal(mockRepo);
        const result = await useCase.execute();

        expect(result.success).toBe(true);
        expect(result.character.hp).toBe(char.maxHp); // fully healed
        expect(result.character.gold).toBe(75); // gold decreased by 25
        expect(mockRepo.saveCharacter).toHaveBeenCalledWith(result.character);
    });

    it("should fail if not enough gold", async () => {
        const char = new Character("Hero", 1, 50, 20, 30, 10); // gold too low
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(char);

        const useCase = new BuyCharacterHeal(mockRepo);
        const result = await useCase.execute();

        expect(result.success).toBe(false);
        expect(result.character.hp).toBe(20); // hp unchanged
        expect(result.character.gold).toBe(10); // gold unchanged
        expect(mockRepo.saveCharacter).toHaveBeenCalledWith(result.character);
    });

    it("should throw an error if character not found", async () => {
        (mockRepo.getCharacter as jest.Mock).mockResolvedValue(null);

        const useCase = new BuyCharacterHeal(mockRepo);
        await expect(useCase.execute()).rejects.toThrow("Character not found");
        expect(mockRepo.saveCharacter).not.toHaveBeenCalled();
    });
});
