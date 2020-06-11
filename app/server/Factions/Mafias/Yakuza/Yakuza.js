const Mafia = require('../Mafia');
const misc = require('../../../sMisc');

const faction_id_const = 3;

class Yakuza extends Mafia {

    constructor() {
        var jobParamenters = {};
        jobParamenters.basicInformation = {
            name: "Mafia_Yakuza", x: -498.413, y: -383.206, z: 34.708, rot: 0,
            dim: 0, faction_id: faction_id_const, className: "Yakuza", blipInfo: { id: 303, color: 1 }
        };
 
        jobParamenters.pickVehicleCoords = [
            { x: -487.403, y: -385.059, z: 34.333, rot: 259.3, spawn: { x: -480.5, y: -385.917, z: 34.131, rot: 261.77 } },
        ];

        jobParamenters.dropVehicleCoords = [
            { x: -479.403, y: -385.059, z: 34.333, rot: 183.93 },
        ];

        jobParamenters.factionVehiclesList = [
            { model: "chino", minimunRank: 1, title: "Yakuza 1 ", fuel: 40, id: 0, numberPlate: "Yakuza000" },
            { model: "enduro", minimunRank: 1, title: "Yakuza 5 ", fuel: 40, id: 1, numberPlate: "Yakuza005" },
            { model: "chino2", minimunRank: 3, title: "Yakuza 2 ", fuel: 40, id: 2, numberPlate: "Yakuza001" },
            { model: "patriot", minimunRank: 6, title: "Yakuza 3 ", fuel: 40, id: 3, numberPlate: "Yakuza002" },
            { model: "stretch", minimunRank: 8, title: "Yakuza 4 ", fuel: 40, id: 4, numberPlate: "Yakuza004" },
        ];
        
        super(jobParamenters);

        mp.events.add({
            
        });
    }

    pressedKeyOnMainShape(player) {
       
        misc.log.debug("this.faction_id: " + this.faction_id);
        misc.log.debug("player.job.name: " + player.job.name);
        misc.log.debug("player.faction.faction_id: " + player.faction.faction_id);
        misc.log.debug("this.name: " + this.name);
        
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        
        if (player.faction.faction_id == this.faction_id) {
            misc.log.debug("Abriendo Menu de mafia");
            player.call("cMafia-Yakuza-OpenMainMenu", [player.lang, execute]);
        }
    }
    
} 
new Yakuza();