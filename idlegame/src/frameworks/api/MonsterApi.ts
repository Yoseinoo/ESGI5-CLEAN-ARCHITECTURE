export interface MonsterDTO {
    name: string;
    hit_points: number;
    strength: number;
}

export async function fetchRandomMonster(): Promise<MonsterDTO> {
    // Get list of monsters
    const list = await fetch("https://www.dnd5eapi.co/api/monsters").then(
        (res) => res.json()
    );

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
