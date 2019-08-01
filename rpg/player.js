
class Player {
    constructor() {
        this.id   = Game.getid("player");
        this.name = "player";
        this.desc = "player";

        const restCommand        = () => { App.Display().showLogMessage(`${this.name} rests.`)};
        const runCommand         = () => { App.Display().showLogMessage(`${this.name} runs.`)};
        const concentrateCommand = () => { App.Display().showLogMessage(`${this.name} concentrates.`)};

        const restAction         = new Action("rest", "rests", restCommand, "images/action_rest.png", 3, false);
        const runAction          = new Action("run", "runs", restCommand, "images/action_run.png", 3, false);
        const concentrateAction  = new Action("concentrate", "concentrates your mind", concentrateCommand, "images/action_concentrate.png", 10, true);
        
        this.actions = [restAction, runAction, concentrateAction];
    }

    update() {
        for (let i=0; i<this.actions.length; i++) {
            this.actions[i].update();
        }
    }
}