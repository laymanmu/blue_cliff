
class Action {
    constructor(name, desc, command, imageSrc, cost=1, isSustaining=false) {
        this.id              = Game.getid("action");
        this.name            = name;
        this.desc            = desc;
        this.command         = command;
        this.coolDownCost    = cost;
        this.image           = document.createElement('img');
        this.image.id        = this.id;
        this.image.src       = imageSrc;
        this.image.className = "actionIcon actionReady";
        this.coolDownValue   = 0;

        if (isSustaining) {
            this.isSustaining = true;
            this.isSustained  = false;
        }
        
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
            this.isSustained = true;
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
        let markup = App.Display().getPopupHeaderMarkup(this.name, this.desc, this.image.src);
        markup += '<hr/><table>';
        markup += App.Display().getTableRowKeyValueMarkup("id:", this.id);
        markup += App.Display().getTableRowKeyValueMarkup("cooldown cost:", this.coolDownCost);
        markup += App.Display().getTableRowKeyValueMarkup("cooldown value:", this.coolDownValue);
        markup += '</table>';
        return markup;
    }
}