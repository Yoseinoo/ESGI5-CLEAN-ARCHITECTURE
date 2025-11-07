import { useCallback, useEffect, useState } from "react";
import { CharacterRepository } from "../frameworks/CharacterRepository";
import { FightEnemy } from "../app/usecases/FightEnemy";
import { SpawnEnemy } from "../app/usecases/SpawnEnemy";
import { UpgradeCharacter } from "../app/usecases/UpgradeCharacter";
import { Character } from "../domain/Character";
import { Enemy } from "../domain/Enemy";
import { ResetCharacter } from "../app/usecases/ResetCharacter";
import { GameProgress } from "../app/usecases/GameProgress";
import { MonsterApiRepository } from "../frameworks/api/MonsterApi";
import { InitGame } from "../app/usecases/InitGame";

const repo = new CharacterRepository();
const monsterRepo = new MonsterApiRepository();
const initGameUseCase = new InitGame(repo);
const fightUseCase = new FightEnemy(repo);
const gameProgress = new GameProgress();
const spawnEnemyUseCase = new SpawnEnemy(monsterRepo, gameProgress);
const upgradeUseCase = new UpgradeCharacter(repo);
const resetUseCase = new ResetCharacter(repo);

export default function App() {
    const [character, setCharacter] = useState<Character | null>(null);
    const [enemy, setEnemy] = useState<Enemy | null>(null);
    const [log, setLog] = useState("");
    const [isIdle, setIsIdle] = useState(false);
    const [speed, setSpeed] = useState(2000); // 2 seconds per fight

    useEffect(() => {
        async function init() {
            const char = await initGameUseCase.execute();
            setCharacter(char);
            setEnemy(await spawnEnemyUseCase.execute());
        }
        init();
    }, []);

    const processFight = useCallback(async () => {
        if (!enemy) return;

        const result = await fightUseCase.execute(enemy);
        setCharacter(result.character);

        if (result.win) {
            setLog(`✅ Defeated ${enemy.name}! +${result.earned} gold`);
            setEnemy(await spawnEnemyUseCase.execute());
        } else {
            setLog(`❌ You lost against ${enemy.name}...`);

            // RESET CHARACTER
            const reset = await resetUseCase.execute();
            setCharacter(reset.character);

            // Spawn a new enemy after reset
            spawnEnemyUseCase.reset(); // rounds & challenge rating reset
            setEnemy(await spawnEnemyUseCase.execute());
        }
    }, [enemy]);

    const upgrade = async () => {
        const result = await upgradeUseCase.execute();
        setCharacter(result.character);
        setLog(
            result.success ? "⚡ Upgrade successful!" : "❗ Not enough gold"
        );
    };

    useEffect(() => {
        if (!isIdle) return;

        const interval = setInterval(() => {
            processFight();
        }, speed);

        return () => clearInterval(interval); // cleanup when idle stops or component unloads
    }, [isIdle, speed, processFight]);

    if (!character || !enemy) return <p>Loading...</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg space-y-4">
            <h1 className="text-2xl font-bold">⚔ Hero: {character.name}</h1>
            <p>Level: {character.level}</p>
            <p>Attack: {character.attack}</p>
            <p>Gold: {character.gold}</p>

            <hr />

            <h2 className="text-xl font-bold">👹 Enemy: {enemy.name}</h2>
            <p>HP: {enemy.hp}</p>
            <p>Attack: {enemy.attack}</p>
            <p>Reward: {enemy.reward} gold</p>

            <div className="flex gap-2">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={processFight}
                >
                    ⚔ Fight
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={upgrade}
                    disabled={character.gold < character.getUpgradeCost()}
                >
                    ⬆ Upgrade ({character.getUpgradeCost()} gold)
                </button>
            </div>

            <div className="flex gap-2 items-center">
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    onClick={() => setIsIdle(!isIdle)}
                >
                    {isIdle ? "⏸ Stop Auto-Fight" : "▶ Start Auto-Fight"}
                </button>

                <select
                    className="border p-2 rounded"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                >
                    <option value={3000}>3s / fight</option>
                    <option value={2000}>2s / fight</option>
                    <option value={1000}>1s / fight</option>
                    <option value={500}>0.5s / fight</option>
                </select>
            </div>

            {log && <p className="font-semibold text-center">{log}</p>}
        </div>
    );
}
