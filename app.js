
class App {
    static Start() {
        this.instance      = new App();
        this.instance.game = new Game();
    }

    constructor() {
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
};
