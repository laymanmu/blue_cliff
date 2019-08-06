
const MobsRepo = new rpg.Repository("mobs", (props) => { return new rpg.Mob(props); });

MobsRepo.define('player', {
    desc: "a player",
    attributes: {con:10,str:10,dex:10,int:10,hp:100},
    effects: [],
    actions: [
        ActionsRepo.create('rest'),
        ActionsRepo.create('run'),
        ActionsRepo.create('concentrate')
    ]
});

MobsRepo.define('wombat', {
    desc: "a wombat",
    imageSrc: "images/action_rest.png",
    attributes: {con:10,str:10,dex:10,int:10,hp:100},
    effects: [],
    actions: []
});