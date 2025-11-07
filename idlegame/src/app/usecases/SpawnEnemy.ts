import { Enemy } from "../../domain/Enemy";
import { GameProgress } from "./GameProgress";
import { IMonsterRepository } from "../ports/MonsterRepository";

export class SpawnEnemy {
    constructor(
        private monsterRepo: IMonsterRepository,
        private gameProgress: GameProgress
    ) {}

    async execute(): Promise<Enemy> {
        this.gameProgress.nextRound();
        const challengeRating = this.gameProgress.getChallengeRating();

        const monsterDTO = await this.monsterRepo.fetchRandomMonster(challengeRating);

        return new Enemy(
            Date.now(),
            monsterDTO.name,
            monsterDTO.hit_points,
            monsterDTO.strength,
            Math.floor(monsterDTO.hit_points / 2) // gold reward
        );
    }

    reset() {
        this.gameProgress.reset();
        this.monsterRepo.clearMonsterCache();
    }
}
