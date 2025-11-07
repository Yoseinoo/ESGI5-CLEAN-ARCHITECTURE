const monsterCache: Record<number, any[]> = {}; // store monster lists by CR

export interface MonsterDTO {
    name: string;
    hit_points: number;
    strength: number;
}

export async function fetchRandomMonster(
    challengeRating: number
): Promise<MonsterDTO> {
    // Fetch monster list only if not already cached for this CR
    if (!monsterCache[challengeRating]) {
        console.log(`Fetching monster list for CR ${challengeRating}`);

        const list = await fetch(
            `https://www.dnd5eapi.co/api/2014/monsters?challenge_rating=${challengeRating}`
        ).then((res) => res.json());

        if (!list.results || list.results.length === 0) {
            throw new Error(
                `No monsters found for challenge rating ${challengeRating}`
            );
        }

        monsterCache[challengeRating] = list.results; // store in cache
    }

    const monsters = monsterCache[challengeRating];

    // Pick a random monster from cached list
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    console.log(`fetching monster details for monster: ${randomMonster.index}`);

    // Fetch monster details
    const data = await fetch(
        `https://www.dnd5eapi.co${randomMonster.url}`
    ).then((res) => res.json());

    return {
        name: data.name,
        hit_points: data.hit_points,
        strength: data.strength ?? 5,
    };
}

// Optional if you want to reset cache when player dies:
export function clearMonsterCache() {
    for (const cr in monsterCache) {
        delete monsterCache[Number(cr)];
    }
}
