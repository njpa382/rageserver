const Mafia = require('../Mafia');
const faction_id_const = 4;

class CosaNostra extends Mafia {

    constructor() {

        var jobParamenters = {};
        jobParamenters.basicInformation = {
            name: "Mafia_CosaNostra", x: 441.211, y: -976.772, z: 30.69, rot: 0,
            dim: 0, faction_id: faction_id_const, className: "CosaNostra", blipInfo: { id: 526, color: 3 }
        };

        jobParamenters.pickVehicleCoords = [
            { x: 428.908, y: -1000.204, z: 25.78, rot: 295.54, spawn: { x: 431.2, y: -997.116, z: 25.763, rot: 176.75 } },
            { x: 438.975, y: -999.889, z: 25.774, rot: 173.55, spawn: { x: 436.206, y: -997.36, z: 25.769, rot: 177.29 } },
        ];

        jobParamenters.dropVehicleCoords = [
            { x: 446.895, y: -996.799, z: 25.767, rot: 183.93 },
            { x: 452.167, y: -997.041, z: 25.763, rot: 173.36 },
        ];

        jobParamenters.factionVehiclesList = [
            { model: "tulip", minimunRank: 1, title: "Cosa Nostra 1 ", fuel: 40, id: 0, numberPlate: "CosaNostra000" },
        ];

        super(jobParamenters);

        mp.events.add({
            
        });

    }

    
} 