
const EffectsRepo = new rpg.Repository("effects", (props) => { return new rpg.Effect(props); });

EffectsRepo.define("fast",   {attributes:{dex:2, str:1}});
EffectsRepo.define("slow",   {attributes:{dex:-2,str:-1}});
EffectsRepo.define("strong", {attributes:{str: 2}});
EffectsRepo.define("weak",   {attributes:{str: -2}});
EffectsRepo.define("smart",  {attributes:{int: 2}});
EffectsRepo.define("dumb",   {attributes:{int: -2}});