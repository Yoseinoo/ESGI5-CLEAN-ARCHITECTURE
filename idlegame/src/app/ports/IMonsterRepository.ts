import { MonsterData } from "../dto/MonsterData";

export interface IMonsterRepository {
    fetchRandomMonster(challengeRating: number): Promise<MonsterData>;
    clearMonsterCache(): void;
}
