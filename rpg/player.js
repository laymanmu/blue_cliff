
class Player {
    constructor() {
        this.id   = Game.getid("player");
        this.name = "player";
        this.desc = "player";

        const restCommand = () => { App.Display().showLogMessage(`${this.name} rests.`)};
        const restAction  = new Action("rest", "rest", restCommand, "favicon.ico", 1, false);
        this.actions      = [restAction];
    }

    update() {
        for (let i=0; i<this.actions.length; i++) {
            this.actions[i].update();
        }
    }
}