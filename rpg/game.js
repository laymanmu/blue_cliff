
class Game {
    constructor() {
        this.display = new Display();
        this.data    = {
            cmdHistory:  {pos:0, partial:null, commands:[]},
            logMessages: {newLogIds:[], messages:[]}
        };
    }

    initPlayer() {
        this.player = new Player();
    }

    handleKeyPress(keyCode) {
        this.log(`got input: ${keyCode}`);
    }

    update() {
    }

    refresh() {
    }

    log(message, keepNew=false) {
        const id = this.display.addLogMessage(message, keepNew);
        this.data.logMessages.newLogIds.push(id);
        this.data.logMessages.messages.push(message);
    }
}