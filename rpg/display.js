
class Display {
    constructor() {
        this.canvas      = document.getElementById('canvas');
        this.context     = this.canvas.getContext('2d');
        this.details     = document.getElementById('details');
        this.actions     = document.getElementById('actions');
        this.log         = document.getElementById('log');
        this.side        = document.getElementById('side');
        this.popup       = document.getElementById('popup');
        this.popupSource = null;
        this.newLogIds   = [];
    }

    showPopup(popupSource) {
        this.popupSource = popupSource;
        const leftMargin = 100;
        const mouse      = App.Mouse();
        const posX       = mouse.clientX + leftMargin;
        let   posY       = mouse.clientY;
        const markup     = this.popupSource.getPopupMarkup();
        this.popup.innerHTML      = markup;
        this.popup.style.display  = 'block';
        const popupHeight  = this.popup.offsetHeight;
        const screenHeight = document.body.clientHeight;
        const bottom       = posY + popupHeight;
        const cutoff       = bottom - screenHeight;
        if (cutoff > 0) {
            const bottomMargin = 30;
            posY = mouse.pageY - (cutoff + bottomMargin);
        } else {
            posY = mouse.pageY;
        }
        this.popup.style.left = `${posX}px`;
        this.popup.style.top  = `${posY}px`;
    }

    refreshPopup() {
        if (this.popupSource != null) {
            this.showPopup(this.popupSource);
        }
    }

    hidePopup() {
        this.popup.style.display = 'none';
        this.popupSource = null;
    }

    showLogMessage(message, keepNew=false) {
        const id     = Game.getid('log');
        const klass  = keepNew ? 'newLogMessage' : 'newLogMessage keepNew';
        const markup = `<span id="${id}" class="${klass}">[turn:${App.Game().turnNum}] ${message}</span><br>`;
        this.log.innerHTML += markup;
        this.log.scrollTop = this.log.scrollHeight;
        this.newLogIds.push(id);
        return id;
    }

    refreshLogMessages() {
        for (let i=0; i<this.newLogIds.length; i++) {
            const logId   = this.newLogIds[i];
            const element = document.getElementById(logId);
            const classes = element.className.split(/\s+/);
            let   keepNew = false;
            for (let i=0; i<classes.length; i++) {
                const klass = classes[i].trim();
                if (klass === "keepNew") {
                    keepNew = true;
                }
            }
            if (keepNew) {
                element.className = "newLogMessage";
            } else {
                element.className = "oldLogMessage";
            }
        }
    }

    update() {
        this.refreshLogMessages();
        this.refreshPopup();
    }

    showActions(actions) {
        this.actions.innerHTML = "";
        for (let i=0; i<actions.length; i++) {
            const action = actions[i];
            this.actions.appendChild(action.image);
        }
    }
}