import { IMonsterRepository } from "../../app/ports/IMonsterRepository";

const monsterCache: Record<number, any[]> = {}; // store monster lists by CR

export interface MonsterDTO {
    name: string;
    hit_points: number;
    strength: number;
}

export class MonsterApiRepository implements IMonsterRepository {
    async fetchRandomMonster(
        challengeRating: number
    ): Promise<MonsterDTO> {
        // Step 1 : Get (or find fallback for) a valid monster list
        if (!monsterCache[challengeRating]) {
            console.log(`Fetching monster list for CR ${challengeRating}`);

            let list = await this.fetchMonsterList(challengeRating);

            // Fallback logic if empty
            if (list.length === 0) {
                console.warn(`⚠ No monsters for CR ${challengeRating}, searching fallback...`);

                let offset = 0.5;
                let attempts = 0;
                const maxAttempts = 5;

                while (list.length === 0 && attempts < maxAttempts) {
                    const lower = await this.fetchMonsterList(challengeRating - offset);
                    if (lower.length) {
                        console.log(`Fallback found at CR ${challengeRating - offset}`);
                        list = lower;
                        break;
                    }

                    const higher = await this.fetchMonsterList(challengeRating + offset);
                    if (higher.length) {
                        console.log(`Fallback found at CR ${challengeRating + offset}`);
                        list = higher;
                        break;
                    }

                    offset += 0.5;
                    attempts++;
                }
            }

            monsterCache[challengeRating] = list; // store in cache
        }

        const monsters = monsterCache[challengeRating];

        // Step 2 : Pick a random monster from cached list
        const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
        console.log(`fetching monster details for monster: ${randomMonster.index}`);

        // Step 3 : Fetch monster details
        const data = await fetch(
            `https://www.dnd5eapi.co${randomMonster.url}`
        ).then((res) => res.json());

        return {
            name: data.name,
            hit_points: data.hit_points,
            strength: data.strength ?? 5,
        };
    }
        
    // Reset cache when player dies
    clearMonsterCache() {
        for (const cr in monsterCache) {
            delete monsterCache[Number(cr)];
        }
    }
    
    // Fetch a list of monsters from api
    async fetchMonsterList(challengeRating: number) {
        const res = await fetch(
            `https://www.dnd5eapi.co/api/2014/monsters?challenge_rating=${challengeRating}`
        ).then(r => r.json());

        return res.results ?? [];
    }
}