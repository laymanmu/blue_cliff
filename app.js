
class App {
    static Start() {
        this.instance = new App();
    }
    static Display() {
        return this.instance.game.display;
    }
    static Game() {
        return this.instance.game;
    }
    static Mouse() {
        return this.instance.mouse;
    }

    constructor() {
        this.mouse = {clientX:0, clientY:0, pageX:0, pageY:0};
        this.game  = new Game();
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
