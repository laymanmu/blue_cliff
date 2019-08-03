
class Player {
    constructor() {
        this.id   = Game.getid("player");
        this.name = "player";
        this.desc = "player";

        const noop = () => {};

        const restStart        = () => { App.Display().showLogMessage(`${this.name} rests.`)};
        const runStart         = () => { App.Display().showLogMessage(`${this.name} runs.`)};
        const runStop          = () => { App.Display().showLogMessage(`${this.name} stops running.`)};
        const concentrateStart = () => { App.Display().showLogMessage(`${this.name} concentrates.`)};
        const concentrateStop  = () => { App.Display().showLogMessage(`${this.name} loses concentration.`)};

        const restAction         = new Action("rest", "rest a single turn", restStart, noop, "images/action_rest.png", 0, false);
        const runAction          = new Action("run", "sustained running", runStart, runStop, "images/action_run.png", 10, true);
        const concentrateAction  = new Action("concentrate", "sustained concentration",concentrateStart, concentrateStop, "images/action_concentrate.png", 10, true);
        
        this.actions = [restAction, runAction, concentrateAction];
    }

    update() {
        for (let i=0; i<this.actions.length; i++) {
            this.actions[i].update();
        }
    }
}