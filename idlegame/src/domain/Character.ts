export class Character {
    constructor(
        public id: number,
        public name: string,
        public level: number = 1,
        public attack: number = 30,
        public gold: number = 0
    ) {}

    upgrade(): boolean {
        const cost = this.level * 10;
        if (this.gold < cost) return false;
        this.gold -= cost;
        this.level += 1;
        this.attack += 20;
        return true;
    }
}
