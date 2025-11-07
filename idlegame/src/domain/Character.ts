export class Character {
    public id = 1;
    public hp: number;
    public maxHp: number;

    constructor(
        //public id: number = 1,
        public name: string,
        public level: number = 1,
        maxHp: number = 50,
        hp: number = 50,
        public attack: number = 30,
        public gold: number = 0
    ) {
        this.maxHp = maxHp;
        this.hp = hp;
    }

    takeDamage(amount: number) {
        this.hp = Math.max(0, this.hp - amount);
    }

    healToFull() {
        this.hp = this.maxHp;
    }

    upgrade(): boolean {
        const cost = this.level * 10;
        if (this.gold < cost) return false;
        this.gold -= cost;
        this.level += 1;
        this.maxHp += 30;
        this.attack += 20;
        return true;
    }

    getUpgradeCost(): number {
        return this.level * 10;
    }

    isDead(): boolean {
        return this.hp <= 0;
    }
}
