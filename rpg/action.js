
class Action {
    constructor(name, desc, startCommand, stopCommand, imageSrc, cost=1, isSustaining=false) {
        this.id              = Game.getid("action");
        this.name            = name;
        this.desc            = desc;
        this.startCommand    = startCommand;
        this.stopCommand     = stopCommand;
        this.isSustaining    = isSustaining;
        this.coolDownCost    = cost;
        this.image           = document.createElement('img');
        this.image.id        = this.id;
        this.image.src       = imageSrc;
        this.image.className = "actionIcon actionReady";
        this.coolDownValue   = 0;
        this.isSustaining    = isSustaining;
        this.isSustained     = false;
        
        // events
        this.image.addEventListener("mouseenter", (e) => {
            App.Display().showPopup(this.getPopupMarkup());
        });
        this.image.addEventListener("mouseleave", (e) => {
            App.Display().hidePopup();
        });
        this.image.addEventListener("click", (e) => {
            this.handleClick();
        });
    }

    handleClick() {
        if (this.isActive()) {
            this.stop();
            return;
        } 
        if (this.coolDownValue != 0) {
            App.Display().showLogMessage(`${this.name} is not ready`);
            return;
        }
        this.start();
    }

    start() {
        this.startCommand();
        App.Game().update();
        this.coolDownValue   = this.coolDownCost;
        this.image.className = "actionIcon";
        if (this.isSustaining) {
            this.isSustained      = true;
            this.image.className += " actionSustained";
        } else if (this.coolDownValue != 0) {
            this.image.className += " actionNotReady";
        }
    }

    stop() {
        this.stopCommand();
        App.Game().update();
        this.coolDownValue   = this.coolDownCost;
        this.image.className = "actionIcon";
        if (this.isSustaining) {
            this.isSustained = false;
        }
        if (this.coolDownValue != 0) {
            this.image.className += " actionNotReady";
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

    isActive() {
        return this.isSustaining && this.isSustained;
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
