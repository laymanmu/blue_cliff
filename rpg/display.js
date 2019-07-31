
class Display {
    constructor() {
        this.canvas  = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.details = document.getElementById('details');
        this.actions = document.getElementById('actions');
        this.log     = document.getElementById('log');
        this.side    = document.getElementById('side');
        this.popup   = document.getElementById('popup');
    }

    showPopup(markup) {
        const leftMargin = 100;
        const posX = this.mouse.clientX + leftMargin;
        let   posY = this.mouse.clientY;

        this.popup.innerHTML     = markup;
        this.popup.style.display = 'block';

        // ensure vertical placement doesn't go under screen:
        const popupHeight  = this.popup.offsetHeight;
        const screenHeight = document.body.clientHeight;
        const bottom       = posY + popupHeight;
        const cutoff       = bottom - screenHeight;
        if (cutoff > 0) {
            const bottomMargin = 30;
            posY = this.mouse.pageY - (cutoff + bottomMargin);
        } else {
            posY = this.mouse.pageY;
        }

        this.popup.style.left = `${posX}px`;
        this.popup.style.top  = `${posY}px`;
    }

    hidePopup() {
        this.popup.style.display = 'none';
    }

    addLogMessage(message, keepNew=false) {
        const id     = App.instance.id('log');
        const klass  = keepNew ? 'newLogMessage' : 'newLogMessage keepNew';
        const markup = `<span id="${id}" class="${klass}">${message}</span><br>`;
        this.log.innerHTML += markup;
        this.log.scrollTop = this.log.scrollHeight;
        return id;
    }
}