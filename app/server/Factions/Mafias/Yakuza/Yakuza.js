
class Camorra extends Mafia {

    constructor() {

        var jobParamenters = {};
        jobParamenters.basicInformation = {
            name: "Mafia_Yakuza", x: -498.413, y: -383.206, z: 34.708, rot: 0,
            dim: 0, faction_id: faction_id_const, className: "Yakuza", blipInfo: { id: 526, color: 3 }
        };
 
        jobParamenters.pickVehicleCoords = [
            { x: -487.403, y: -385.059, z: 34.333, rot: 259.3, spawn: { x: -480.5, y: -385.917, z: 34.131, rot: 261.77 } },
        ];

        jobParamenters.dropVehicleCoords = [
            { x: -487.403, y: -385.059, z: 34.333, rot: 183.93 },
        ];

        jobParamenters.factionVehiclesList = [
            { model: "tulip", minimunRank: 1, title: "Yakuza 1 ", fuel: 40, id: 0, numberPlate: "Yakusa000" },
        ];

        super(jobParamenters);

        mp.events.add({
            
        });

    }

    
} 