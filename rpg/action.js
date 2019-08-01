
class Action {
    constructor(name, desc, command, imageSrc, cost=1, isSustaining=false) {
        this.id              = Game.getid("action");
        this.name            = name;
        this.desc            = desc;
        this.command         = command;
        this.coolDownCost    = cost;
        this.coolDownValue   = 0;
        this.isSustaining    = isSustaining;
        this.isSustained     = false;
        this.image           = document.createElement('img');
        this.image.id        = this.id;
        this.image.src       = imageSrc;
        this.image.className = "actionIcon actionReady";
        
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
        if (this.coolDownValue != 0) {
            App.Display().showLogMessage(`${this.name} is not ready`);
            return;
        }
        if (this.isSustained) {
            App.Display().showLogMessage(`TODO: disable ${this.name}`);
            return;
        }

        App.Game().update();
        this.command();
        this.coolDownValue = this.coolDownCost;

        if (this.isSustaining) {
            this.isSustained     = true;
            this.image.className = "actionIcon actionSustained";
        } else {
            if (this.coolDownValue != 0) {
                this.image.className = "actionIcon actionNotReady";
            }
        }
    }

    update() {
        if (this.coolDownValue > 0) {
            this.coolDownValue--;
            if (this.coolDownValue == 0) {
                if (this.image.className == "actionIcon actionNotReady") {
                    this.image.className = "actionIcon actionReady";
                }
            }
        }
    }

    getPopupMarkup() {
        // pair example: {key:"required", value:"required", rowClass="optional", keyClass="optional", valueClass="optional"}
        const keyValues = [
            {key: "type:          ", value: "action", valueClass:"actionType"},
            {key: "id:            ", value: this.id},
            {key: "cooldown cost: ", value: this.coolDownCost},
            {key: "cooldown value:", value: this.coolDownValue}
        ]
        return App.Display().getPopupMarkup(this.name, this.desc, this.image.src, keyValues);
    }
}