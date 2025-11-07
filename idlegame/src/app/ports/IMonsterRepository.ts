import { MonsterDTO } from "../../frameworks/api/MonsterApi";

export interface IMonsterRepository {
    fetchRandomMonster(challengeRating: number): Promise<MonsterDTO>;
    clearMonsterCache(): void;
}
