export class Character {
    public id = 1;
    public hp: number;
    public maxHp: number;

    constructor(
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
        this.maxHp += 10;
        this.attack += 5;
        return true;
    }

    upgradeAttack(): boolean {
        const cost = this.level * 15;
        if (this.gold < cost) return false;
        this.gold -= cost;
        this.attack += 10;
        return true;
    }

    upgradeHealth(): boolean {
        const cost = this.level * 12;
        if (this.gold < cost) return false;
        this.gold -= cost;
        this.maxHp += 20;
        return true;
    }

    buyFullHeal(): boolean {
        const cost = 25;
        if (this.gold < cost) return false;
        this.gold -= cost;
        this.healToFull();
        return true;
    }

    getUpgradeCost(): number {
        return this.level * 10;
    }

    getAttackUpgradeCost(): number {
        return this.level * 15;
    }

    getHealthUpgradeCost(): number {
        return this.level * 12;
    }

    getHealCost(): number {
        return 25;
    }

    isDead(): boolean {
        return this.hp <= 0;
    }
}
