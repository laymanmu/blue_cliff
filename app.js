
class App {
    static Start() {
        this.instance = new App();
    }

    constructor() {
        this.game  = new Game();
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
        event = event || window.event;
        const keyCode = event.which == 0 ? event.keyCode : event.which;
        this.game.handleKeyPress(keyCode);
    }
};
