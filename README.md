# ⚔️ D&D Idle Fighter

Un jeu **idle RPG** en navigateur où votre héros affronte des monstres générés depuis l’API **Dungeons & Dragons 5e**.  
Le jeu fonctionne **sans backend**, avec stockage local dans le navigateur (**IndexedDB via Dexie**) et une architecture propre (**Clean Architecture**).

---

## 🧩 Structure du projet

src/
├── domain/ → logique métier (Héros, Ennemis, Combat)
├── application/ → use cases (Combattre, Spawn ennemis, Upgrades)
├── frameworks/ → API externe + base de données (Dexie, D&D API)
├── adapters/ → Interface (React)

---

## 🎮 Fonctionnalités

- 🐉 Affronter des monstres D&D aléatoires
- 🔁 Un nouvel ennemi apparaît après chaque victoire
- 💰 Gain d’or + amélioration du personnage
- 💾 Sauvegarde locale dans le navigateur (IndexedDB)
- ⚙️ Architecture propre (Clean Architecture)
- 🌐 Pas de serveur, tout tourne en frontend

---

## 🚀 Installation

```bash
git clone https://github.com/Yoseinoo/ESGI5-CLEAN-ARCHITECTURE.git
cd idlegame
npm install
npm start
```