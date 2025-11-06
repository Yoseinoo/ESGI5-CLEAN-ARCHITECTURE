import { Enemy } from "../../domain/Enemy";
import { fetchRandomMonster } from "../../frameworks/api/MonsterApi";

export class SpawnEnemy {
    async execute(): Promise<Enemy> {
        const monster = await fetchRandomMonster();

        return new Enemy(
            Date.now(),
            monster.name,
            monster.hit_points,
            monster.strength,
            Math.floor(monster.hit_points / 2) // gold reward
        );
    }
}
