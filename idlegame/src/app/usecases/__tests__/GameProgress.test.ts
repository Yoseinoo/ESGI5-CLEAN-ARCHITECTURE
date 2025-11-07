import { GameProgress } from "../GameProgress";

describe("GameProgress", () => {
    it("should start at round 0 and CR 0.5", () => {
        const progress = new GameProgress();
        expect(progress.getRounds()).toBe(0);
        expect(progress.getChallengeRating()).toBe(0.5);
    });

    it("should increase rounds when calling nextRound()", () => {
        const progress = new GameProgress();
        progress.nextRound();
        progress.nextRound();

        expect(progress.getRounds()).toBe(2);
        expect(progress.getChallengeRating()).toBe(0.5); // still no increase
    });

    it("should increase challenge rating every 10 rounds", () => {
        const progress = new GameProgress();

        for (let i = 0; i < 9; i++) {
            progress.nextRound();
        }

        expect(progress.getRounds()).toBe(9);
        expect(progress.getChallengeRating()).toBe(0.5); // Not increased yet

        progress.nextRound(); // 10th round

        expect(progress.getRounds()).toBe(10);
        expect(progress.getChallengeRating()).toBe(1.0); // 0.5 + 0.5
    });

    it("should continue increasing challenge rating every 10 rounds", () => {
        const progress = new GameProgress();

        for (let i = 0; i < 20; i++) {
            progress.nextRound();
        }

        expect(progress.getRounds()).toBe(20);
        expect(progress.getChallengeRating()).toBe(1.5); // 0.5 -> 1.0 -> 1.5
    });

    it("should reset rounds and challenge rating", () => {
        const progress = new GameProgress();

        for (let i = 0; i < 15; i++) {
            progress.nextRound();
        }

        expect(progress.getRounds()).toBe(15);
        expect(progress.getChallengeRating()).toBe(1.0);

        progress.reset();

        expect(progress.getRounds()).toBe(0);
        expect(progress.getChallengeRating()).toBe(0.5);
    });
});
