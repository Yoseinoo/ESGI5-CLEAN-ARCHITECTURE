export interface MonsterDTO {
    name: string;
    hit_points: number;
    strength: number;
}

export async function fetchRandomMonster(challengeRating: number): Promise<MonsterDTO> {
    // Get list of monsters
    const list = await fetch(
        `https://www.dnd5eapi.co/api/2014/monsters?challenge_rating=${challengeRating}`
    ).then(res => res.json());

    if (!list.results || list.results.length === 0) {
        throw new Error(`No monsters found for challenge rating ${challengeRating}`);
    }

    const randomMonster =
        list.results[Math.floor(Math.random() * list.results.length)];

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
