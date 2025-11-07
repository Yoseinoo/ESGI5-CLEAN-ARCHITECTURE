import { SpawnEnemy } from "../SpawnEnemy";
import { Enemy } from "../../../domain/Enemy";
import { GameProgress } from "../../usecases/GameProgress";
import { IMonsterRepository } from "../../ports/IMonsterRepository";
import { MonsterData } from "../../dto/MonsterData";

// 1️⃣ Fake MonsterRepo
class FakeMonsterRepo implements IMonsterRepository {
    private calls: { cr: number }[] = [];

    async fetchRandomMonster(cr: number): Promise<MonsterData> {
        this.calls.push({ cr });
        return { name: `Monster${cr}`, hit_points: 10 + cr, strength: 2 + cr };
    }

    clearMonsterCache() {
        this.calls = [];
    }

    getCalls() {
        return this.calls;
    }
}

// 2️⃣ Fake GameProgress
class FakeGameProgress extends GameProgress {
    private round = 0;

    nextRound() {
        this.round += 1;
    }

    getChallengeRating() {
        return 0.5 + (this.round - 1) * 0.5; // example: increase CR every round
    }

    reset() {
        this.round = 0;
    }
}

describe("SpawnEnemy Use Case", () => {
    let monsterRepo: FakeMonsterRepo;
    let progress: FakeGameProgress;
    let useCase: SpawnEnemy;

    beforeEach(() => {
        monsterRepo = new FakeMonsterRepo();
        progress = new FakeGameProgress();
        useCase = new SpawnEnemy(monsterRepo, progress);
    });

    it("should create an Enemy with proper fields", async () => {
        const enemy = await useCase.execute();

        expect(enemy).toBeInstanceOf(Enemy);
        expect(enemy.name).toBe("Monster0.5");
        expect(enemy.hp).toBe(10.5); // hit_points from monsterDTO
        expect(enemy.attack).toBe(2.5); // strength from monsterDTO
        expect(enemy.reward).toBe(Math.floor(10.5 / 2));
    });

    it("should increase CR on next rounds", async () => {
        const enemy1 = await useCase.execute();
        const enemy2 = await useCase.execute();

        expect(enemy1.name).toBe("Monster0.5");
        expect(enemy2.name).toBe("Monster1"); // CR increased
    });

    it("reset() should reset progress and clear cache", async () => {
        await useCase.execute();
        expect(monsterRepo.getCalls().length).toBe(1);

        useCase.reset();

        expect(monsterRepo.getCalls().length).toBe(0); // cache cleared
        const crAfterReset = progress.getChallengeRating();
        expect(crAfterReset).toBe(0); // back to initial CR
    });
});
