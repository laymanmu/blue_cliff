
var rpg = {};

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

rpg.SAttribute = class extends rpg.Viewable {
    constructor(props) {
        super.constructor(props);
        this.value = props.max;
    }
};

rpg.Effect = class extends rpg.Viewable {
    constructor(props) {
        super(props);
    }
};

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
    getAttributeValue(code) {
        const attr = this.attributes[code];
        let value  = attr.value;
    }
};

rpg.Game = class Game {
    static uid() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    constructor() {
        this.turnNum = 0;
        this.cmdHist = {pos:0, partial:null, commands:[]};
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
        this.display.showLogMessage(`=== o==]/////> turn: ${this.turnNum} ===============`);
        this.player.update();
        this.display.update();
    }
};