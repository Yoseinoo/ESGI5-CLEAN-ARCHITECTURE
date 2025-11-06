import { useEffect, useState } from "react";
import { CharacterRepository } from "../frameworks/CharacterRepository";
import { FightEnemy } from "../app/usecases/FightEnemy";
import { UpgradeCharacter } from "../app/usecases/UpgradeCharacter";
import { GetCharacter } from "../app/usecases/GetCharacter";
import { Enemy } from "../domain/Enemy";
import { Character } from "../domain/Character";

const repo = new CharacterRepository();
const fightUseCase = new FightEnemy(repo);
const upgradeUseCase = new UpgradeCharacter(repo);
const getCharUseCase = new GetCharacter(repo);

export default function App() {
    const [character, setCharacter] = useState<Character | null>(null);
    const [log, setLog] = useState<string>("");

    useEffect(() => {
        async function init() {
            const char = await repo.initDefaultCharacter();
            setCharacter(char);
        }
        init();
    }, []);

    const fight = async () => {
        const enemy = new Enemy(1, "Slime", 8, 5);
        const result = await fightUseCase.execute(enemy);
        setCharacter(result.character);
        setLog(result.win ? `Victory! +${result.earned} gold` : "Defeat...");
    };

    const upgrade = async () => {
        const result = await upgradeUseCase.execute();
        setCharacter(result.character);
        setLog(result.success ? "Upgrade successful!" : "Not enough gold");
    };

    if (!character) return <p>Loading...</p>;

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4 p-4 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold">{character.name}</h1>
            <p>Level: {character.level}</p>
            <p>Attack: {character.attack}</p>
            <p>Gold: {character.gold}</p>

            <div className="flex gap-2">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={fight}
                >
                    ⚔️ Fight Slime
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={upgrade}
                >
                    ⬆️ Upgrade
                </button>
            </div>

            {log && <p className="mt-2 text-center font-semibold">{log}</p>}
        </div>
    );
}
