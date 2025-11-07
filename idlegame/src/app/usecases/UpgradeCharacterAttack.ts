import { ICharacterRepository } from "../ports/ICharacterRepository";

export class UpgradeCharacterAttack {
    constructor(private repo: ICharacterRepository) {}
    async execute() {
        const c = await this.repo.getCharacter(1);
        if (!c) throw new Error("Character not found");
        const success = c.upgradeAttack();
        await this.repo.saveCharacter(c);
        return { success, character: c };
    }
}
