
class Action {
    constructor(name, desc, command, imageSrc, cost=1, isSustained=false) {
        this.id              = Game.getid("action");
        this.name            = name;
        this.desc            = desc;
        this.command         = command;
        this.coolDownCost    = cost;
        this.isSustained     = isSustained;
        this.image           = document.createElement('img');
        this.image.id        = this.id;
        this.image.src       = imageSrc;
        this.image.className = "actionIcon actionReady";
        this.coolDownValue   = 0;
        
        // events
        this.image.addEventListener("mouseenter", (e) => {
            App.Display().showPopup(this.getPopupMarkup());
        });
        this.image.addEventListener("mouseleave", (e) => {
            App.Display().hidePopup();
        });
        this.image.addEventListener("click", (e) => {
            this.use();
        });
    }

    use() {
        App.Display().showLogMessage(`clicked action: ${this.name}`);
        App.Game().update();
    }

    update() {
    }

    getPopupMarkup() {
        return App.Display().getPopupHeaderMarkup(this.name, this.desc, this.image.src);
    }
}