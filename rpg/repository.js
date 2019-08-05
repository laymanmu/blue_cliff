
class Repository {
    constructor(repositoryName, instanceConstructor) {
        this.name        = repositoryName;
        this.constructor = instanceConstructor;
        this.templates   = {};
        this.randPool    = [];
    }

    define(name, template, canBeRandomlyCreated=true) {
        this.templates[name] = template;
        if (canBeRandomlyCreated) {
            this.randPool.push(template);
        }
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

    createRandom() {
        var template = this.randPool[Math.floor(Math.random()*this.randPool.length)]
        return this.constructor(template);
    }
}