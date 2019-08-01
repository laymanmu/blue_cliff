
class Display {
    constructor() {
        this.canvas    = document.getElementById('canvas');
        this.context   = this.canvas.getContext('2d');
        this.details   = document.getElementById('details');
        this.actions   = document.getElementById('actions');
        this.log       = document.getElementById('log');
        this.side      = document.getElementById('side');
        this.popup     = document.getElementById('popup');
        this.newLogIds = [];
    }

    showPopup(markup) {
        const leftMargin = 100;
        const mouse      = App.Mouse();
        const posX       = mouse.clientX + leftMargin;
        let   posY       = mouse.clientY;

        this.popup.innerHTML     = markup;
        this.popup.style.display = 'block';

        // ensure vertical placement doesn't go under screen:
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

    hidePopup() {
        this.popup.style.display = 'none';
    }

    showLogMessage(message, keepNew=false) {
        const id     = Game.getid('log');
        const klass  = keepNew ? 'newLogMessage' : 'newLogMessage keepNew';
        const markup = `<span id="${id}" class="${klass}">${message}</span><br>`;
        this.log.innerHTML += markup;
        this.log.scrollTop = this.log.scrollHeight;
        this.newLogIds.push(id);
        return id;
    }

    update() {
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

    showActions(actions) {
        this.actions.innerHTML = "";
        for (let i=0; i<actions.length; i++) {
            const action = actions[i];
            this.actions.appendChild(action.image);
        }
    }

    getPopupHeaderMarkup(name, desc, imageSrc) {
        const image = imageSrc ? `<img class="popupImage" src="${imageSrc}"/>` : '';
        return `<table>${image}<tr><td class="popupName">${name}</td></tr><tr><td class="popupDesc">${desc}</td></tr></table>`;
    }

    getTableRowKeyValueMarkup(key, value, trClass="", tdKeyClass="", tdValueClass="") {
        return `<tr class="${trClass}"><td class="${tdKeyClass}">${key}</td><td class="${tdValueClass}">${value}</td></tr>`;
    }

}