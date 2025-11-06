export class GameProgress {
    private rounds = 0;
    private challengeRating = 0.5;
    private readonly roundsPerIncrease = 10;
    private readonly challengeIncrease = 0.5;

    nextRound() {
        this.rounds++;
        if (this.rounds % this.roundsPerIncrease === 0) {
            this.challengeRating += this.challengeIncrease;
        }
    }

    getChallengeRating() {
        return this.challengeRating;
    }

    reset() {
        this.rounds = 0;
        this.challengeRating = 0.5;
    }

    getRounds() {
        return this.rounds;
    }
}
