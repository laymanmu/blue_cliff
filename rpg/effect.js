
class Effect {
    constructor(props) {
        this.id        = Game.getid("effect");
        this.name      = props.name;
        this.statName  = props.statName;
        this.statDelta = props.statDelta;
    }
}