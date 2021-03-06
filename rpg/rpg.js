
var rpg = {};

rpg.Repository = class {
    constructor(repositoryName, instanceConstructor) {
        this.name        = repositoryName;
        this.constructor = instanceConstructor;
        this.templates   = {};
    }
    define(name, template) {
        template.name = name;
        this.templates[name] = template;
    }
    create(name, overridingProperties) {
        if (!this.templates[name]) {
            throw new Error(`${this.name} repository create() - unknown template name: ${name}`);
        }
        const template = this.templates[name];
        const instance = this.constructor(template);
        for (let key in overridingProperties) {
            instance[key] = overridingProperties[key];
        }
        return instance;
    }
};

rpg.Viewable = class {
    constructor(props) {
        this.id = rpg.Game.uid();
        for (let key in props) {
            if (key == "imageSrc") {
                this.image     = document.createElement('img');
                this.image.src = props.imageSrc;
                this.image.id  = this.id;
            } else {
                this[key] = props[key];
            }
        }
    }
};

rpg.Effect = class extends rpg.Viewable {
    constructor(props) {
        super(props);
    }
};

rpg.Mob = class extends rpg.Viewable {
    constructor(props) {
        super(props);
    }
    update() {
        for (let i=0; i<this.actions.length; i++) {
            this.actions[i].update();
        }
    }
    addEffect(name, overrides) {
        this.effects.push(EffectsRepo.create(name, overrides));
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
    getEffectedAttributes() {
        const attrs = {};
        for (let name in this.attributes) {
            let value = this.attributes[name];
            for (let i=0; i<this.effects.length; i++) {
                value += (parseInt(this.effects[i].attributes[name]) || 0);
            }
            attrs[name] = value;
        }
        return attrs;
    }
};

rpg.Room = class extends rpg.Viewable {
    constructor(props) {
        super(props);
    }
    update() {
        for (let mob of this.mobs) {
            mob.update();
        }
    }
    getRoomMarkup() {
        let markup = '';
        markup += `<span class="roomName">${this.name}</span><br>`;
        markup += `<span class="roomDesc">${this.desc}</span><br>`;
        for (let gate of this.gates) {
            markup += `<span class="roomGate">${gate.name}</span>`;
        }
        return markup;
    }
};

rpg.Game = class Game {
    static uid() {
        return '_'+ Math.random().toString(36).substr(2, 9);
    }
    constructor() {
        this.turnNum = 0;
        this.cmdHist = {pos:0, partial:null, commands:[]};
        this.rooms   = [RoomsRepo.create('start'), RoomsRepo.create('creek')];
        this.room    = this.rooms[0];
        this.room.gates.push({name:"path", room:'creek'});
        this.player  = MobsRepo.create('player');
        this.display = new Display();
        this.display.showActions(this.player.actions);
    }
    handleKeyPress(keyCode) {
        this.display.showLogMessage(`got input: ${keyCode}`);
        this.update();
    }
    update() {
        this.turnNum++;
        this.display.showLogMessage(`=== [turn: ${this.turnNum}] ===`);
        this.room.update();
        this.display.update();
        this.player.update();
    }
};

