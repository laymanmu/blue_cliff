
class Game {
    static getid(prefix) {
        if (!this._ids) this._ids = {};
        this._ids[prefix] = this._ids[prefix] || 0;
        return `${prefix}_${this._ids[prefix]++}`;
    }

    constructor() {
        this.cmdHist = {pos:0, partial:null, commands:[]};
        this.player  = new Player();
        this.display = new Display();
        this.display.showActions(this.player.actions);
    }

    handleKeyPress(keyCode) {
        this.display.showLogMessage(`got input: ${keyCode}`);
        this.update();
    }

    update() {
        this.display.update();
        this.player.update();
    }
}