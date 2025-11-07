export class Enemy {
    public hp: number;

    constructor(
        public id: number,
        public name: string,
        hp: number,
        public attack: number,
        public reward: number
    ) {
        this.hp = hp;
    }

    takeDamage(amount: number) {
        this.hp = Math.max(0, this.hp - amount);
    }

    isDead(): boolean {
        return this.hp <= 0;
    }
}
