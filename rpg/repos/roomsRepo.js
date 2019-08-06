
const RoomsRepo = new rpg.Repository('rooms', (props) => { return new rpg.Room(props); });

RoomsRepo.define('start', {
    desc: 'the starting room',
    mobs: [MobsRepo.create('wombat'), MobsRepo.create('wombat')],
    gates: []
});

RoomsRepo.define('creek', {
    desc: 'a small creek between the trees',
    mobs: [],
    gates: []
});
