
const EffectsRepo = new Repository("effects", (props) => { return new Effect(props); });

const templates = {
    "fast":   {"statName":"dex", "statDelta": 2},
    "slow":   {"statName":"dex", "statDelta":-2},
    "strong": {"statName":"str", "statDelta": 2},
    "weak":   {"statName":"str", "statDelta":-2},
    "smart":  {"statName":"int", "statDelta": 2},
    "dumb":   {"statName":"int", "statDelta":-2}
};

for (let name in templates) {
    const template = templates[name];
    template.name  = name;
    EffectsRepo.define(name, templates[name]);
}