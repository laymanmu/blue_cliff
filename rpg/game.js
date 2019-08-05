
class Game {
    static getid(prefix) {
        if (!this._ids) this._ids = {};
        this._ids[prefix] = this._ids[prefix] || 0;
        return `${prefix}_${this._ids[prefix]++}`;
    }

    constructor() {
        this.turnNum = 0;
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
        this.turnNum++;
        this.display.showLogMessage(`=== o==]/////> turn: ${this.turnNum} ===============`);
        this.player.update();
        this.display.update();
    }
}