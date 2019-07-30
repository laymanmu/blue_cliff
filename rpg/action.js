
class Action {
    constructor(name, desc, command, imageSrc, cost=1, isSustained=false) {
        this.id              = App.instance.id("action");
        this.name            = name;
        this.desc            = desc;
        this.command         = command;
        this.coolDownCost    = cost;
        this.isSustained     = isSustained;
        this.image           = document.createElement('img');
        this.image.id        = this.id;
        this.image.src       = imageSrc;
        this.image.className = "actionIcon actionReady";
        this.coolDownValue   = 0;
        
        // events:
        this.image.command = this.command;
        this.image.addEventListener("mouseenter", (e) => {
        });
    }


}