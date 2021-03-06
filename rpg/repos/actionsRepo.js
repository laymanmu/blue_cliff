
const ActionsRepo = new rpg.Repository("actions", (props) => { return new rpg.Action(props); });

ActionsRepo.define('rest', {
    "desc":        "rest a single turn",
    "coolDownCost": 0,
    "isSustaining": false,
    "imageSrc":     "images/action_rest.png",
    "startCommand": () => {
        const actor = App.Game().player;
        App.Display().showLogMessage(`${actor.name} rests`);
    },
    "stopCommand": () => {
        const actor = App.Game().player;
    }
});

ActionsRepo.define('run', {
    "desc":        "sustained running",
    "coolDownCost": 8,
    "isSustaining": true,
    "imageSrc":     "images/action_run.png",
    "startCommand": () => {
        const actor = App.Game().player;
        App.Display().showLogMessage(`${actor.name} starts running`);
        actor.addEffect('fast')
    },
    "stopCommand": () => {
        const actor = App.Game().player;
        App.Display().showLogMessage(`${actor.name} stops running`);
        actor.removeEffect('fast')
    }
});

ActionsRepo.define('concentrate', {
    "desc":        "sustained concentration",
    "coolDownCost": 4,
    "isSustaining": true,
    "imageSrc":     "images/action_concentrate.png",
    "startCommand": () => {
        const actor = App.Game().player;
        App.Display().showLogMessage(`${actor.name} starts concentrating`);
        actor.addEffect('smart');
    },
    "stopCommand": () => {
        const actor = App.Game().player;
        App.Display().showLogMessage(`${actor.name} stops concentrating`);
        actor.removeEffect('smart');
    }
});
