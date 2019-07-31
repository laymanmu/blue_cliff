
class Game {
    static getid(prefix) {
        if (!this._ids) this._ids = {};
        this._ids[prefix] = this._ids[prefix] || 0;
        return `${prefix}_${this._ids[prefix]++}`;
    }
    constructor() {
        this.display = new Display();
        this.cmdHist =  {pos:0, partial:null, commands:[]};
        this.player  = new Player();
    }

    handleKeyPress(keyCode) {
        this.log(`got input: ${keyCode}`);
        this.update();
    }

    update() {
        this.display.update();
        this.player.update();
    }

    log(message, keepNew=false) {
        this.display.addLogMessage(message, keepNew);
    }
}