
rpg.Action = class extends rpg.Viewable {
    constructor(props) {
        super(props);
        this.image.className = "actionIcon actionReady";
        this.coolDownValue   = 0;
        this.isSustained     = false;
        this.image.addEventListener("mouseenter", (e) => {
            App.Display().showPopup(this);
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
            App.Display().update();
            return;
        } 
        if (this.coolDownValue != 0) {
            App.Display().showLogMessage(`${this.name} is not ready`);
            return;
        }
        this.start();
        App.Game().update();
    }

    start() {
        this.startCommand();
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
        // pair example: {key:"required", value:"required", rowClass="optional", keyClass="optional", valueClass="optional"}
        const keyValues = [
            {key: "type:          ", value: "action", valueClass:"actionType"},
            {key: "id:            ", value: this.id},
            {key: "cooldown cost: ", value: this.coolDownCost},
            {key: "cooldown value:", value: this.coolDownValue}
        ];
        let markup = '<table>';
        markup += '<tr>';
        markup +=   `<td><img class="popupImage" src="${this.image.src}"/></td>`;
        markup +=   `<td class="popupName">${this.name}</td>`;
        markup += '</tr>';
        markup += '<tr>';
        markup +=   `<td class="popupDesc" colspan="2">${this.desc}</td>`;
        markup += '</tr>';
        markup += '</table>';
        markup += '<hr/>';
        markup += '<table>';
        for (let i=0; i<keyValues.length; i++) {
            const pair = keyValues[i];
            const rowClass = pair.rowClass   ? ` class="${pair.rowClass}"`   : '';
            const keyClass = pair.keyClass   ? ` class="${pair.keyClass}"`   : '';
            const valClass = pair.valueClass ? ` class="${pair.valueClass}"` : '';
            markup += `<tr${rowClass}>`;
            markup += `<td${keyClass}>${pair.key}</td>`;
            markup += `<td${valClass}>${pair.value}</td>`;
            markup += '</tr>';
        }
        markup += '</table>';
        return markup;
    }

}
