
class Player {
    constructor() {
        this.id    = Game.getid("player");
        this.name  = "player";
        this.desc  = "player";
        this.stats = {
            con: 10,
            str: 10, 
            dex: 10,
            int: 10,
            hp:  100
        };
        this.effects = [];
        this.actions = [
            ActionsRepo.create('rest'), 
            ActionsRepo.create('run'), 
            ActionsRepo.create('concentrate')
        ];
    }

    update() {
        for (let i=0; i<this.actions.length; i++) {
            this.actions[i].update();
        }
    }

    addEffect(name, overrides) {
        this.effects.push(EffectsRepo.create(name, overrides));
        console.log(this.getEffectNames());
    }

    removeEffect(name) {
        const effects = [];
        for (let i=0; i<this.effects.length; i++) {
            const effect = this.effects[i];
            if (effect.name !== name) {
                effects.push(effect);
            }
        }
        this.effects = effects;
    }

    getEffectNames() {
        return this.effects.map((e) => { return e.name; });
    }
}