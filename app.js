
class App {
    static Start() {
        this.instance      = new App();
        this.instance.game = new Game();
    }
    constructor() {
        this.ui         = {};
        this.ui.canvas  = document.getElementById('canvas');
        this.ui.details = document.getElementById('details');
        this.ui.actions = document.getElementById('actions');
        this.ui.log     = document.getElementById('log');
        this.ui.side    = document.getElementById('side');
        this.ui.popup   = document.getElementById('popup');
        this.ui.context = this.ui.canvas.getContext('2d');

        // input (track mouse; pass keyboard events):
        this.mouse = {clientX:0, clientY:0, pageX:0, pageY:0};
        document.onmousemove = (e) => { this.handleMouseMove(e); };
        window.onkeypress    = (e) => { this.handleKeyPress(e);  };
    }

    handleMouseMove(event) {
        this.mouse.clientX = event.clientX;
        this.mouse.clientY = event.clientY;
        this.mouse.pageX   = event.pageX;
        this.mouse.pageY   = event.pageY;
    }

    handleKeyPress(event) {
        if (this.game) {
            event = event || window.event;
            const keyCode = event.which == 0 ? event.keyCode : event.which;
            this.game.handleKeyPress(keyCode);
        }
    }

    id(prefix) { 
        if (!this._ids) this._ids = {prefix: 0};
        this._ids[prefix] = this._ids[prefix] || 0;
        return `${prefix}_${this._ids[prefix]++}`;
    }
    
    getLogMessageMarkup(id, klass, message) {
        return `<span id="${id}" class="${klass}">${message}</span><br>`;
    }

    showPopup(markup) {
        const leftMargin = 100;
        const posX = this.mouse.clientX + leftMargin;
        let   posY = this.mouse.clientY;

        this.ui.popup.innerHTML     = markup;
        this.ui.popup.style.display = 'block';

        // ensure vertical placement doesn't go under screen:
        const popupHeight  = this.ui.popup.offsetHeight;
        const screenHeight = document.body.clientHeight;
        const bottom       = posY + popupHeight;
        const cutoff       = bottom - screenHeight;
        if (cutoff > 0) {
            const bottomMargin = 30;
            posY = this.mouse.pageY - (cutoff + bottomMargin);
        } else {
            posY = this.mouse.pageY;
        }

        this.ui.popup.style.left = `${posX}px`;
        this.ui.popup.style.top  = `${posY}px`;
    }

    hidePopup() {
        this.ui.popup.style.display = 'none';
    }
};
