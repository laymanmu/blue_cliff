
class Game {
    constructor() {
        this.context = App.instance.ui.context;
        this.data = {
            cmdHistory: {pos:0, partial:null, commands:[]},
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
        const id     = App.instance.id('log');
        const klass  = keepNew ? 'newLogMessage' : 'newLogMessage keepNew';
        const markup = App.instance.getLogMessageMarkup(id, klass, message);
        App.instance.ui.log.innerHTML += markup;
        this.data.logMessages.messages.push(message);
        this.data.logMessages.newLogIds.push(id);
        App.instance.ui.log.scrollTop = App.instance.ui.log.scrollHeight;
    }
}