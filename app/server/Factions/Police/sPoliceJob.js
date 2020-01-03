const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const Job = require('../../Jobs/sJob');
const FactionJob = require('../../Factions/sFactionsJob');

const faction_id_const = 1;



class PoliceJob extends FactionJob {
    constructor() {

        var jobParamenters = {};
        //jobParamenters.basicInformation = {
        //    name: "Police Job", x: 441.211, y: -976.772, z: 30.69, rot: 0,
        //    dim: 0, faction_id: faction_id_const, className: "sPoliceJob"
        //};
        jobParamenters.basicInformation = {
            name: "Police", x: 429.284, y: -998.777, z: 25.739, rot: 84.36,
            dim: 0, faction_id: faction_id_const, className: "sPoliceJob"
        };
        
        jobParamenters.pickVehicleCoords = [
            { x: 428.908, y: -1000.204, z: 25.78, rot: 295.54 , spawn: {x: 431.2, y: -997.116, z: 25.763, rot: 176.75}},
            { x: 438.975, y: -999.889, z: 25.774, rot: 173.55 , spawn: {x: 436.206, y: -997.36, z: 25.769, rot: 177.29 }},
        ];

        jobParamenters.factionVehiclesList = [
            { model: "police3", minimunRank: 1, title:"Police 3", fuel:40 , id:0 , numberPlate:"POLICE000"},
        ];
        
        super(jobParamenters);
    }

    setLocalSettings() {
        this.blip.model = 514;
        this.blip.color = 17;
    }

    pressedKeyOnMainShape(player) {
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        player.call("sPoliceJob-OpenMainMenu", [player.lang, execute]);
    }


    setWorkingClothesForMan(player) {
        this.giveInitialSet(player);
        // Set Uniform
        player.setClothes(3, 0, 0, 2);
        player.setClothes(8, 58, 0, 2);
        player.setClothes(6, 25, 0, 2);
        player.setClothes(4, 35, 0, 2);
        player.setClothes(11, 55, 0, 2);
        super.setWorkingClothesForMan(player);
    }

    setWorkingClothesForWoman(player) {
        this.giveInitialSet(player);
        // Set Uniform
        player.setClothes(3, 0, 0, 2);
        player.setClothes(8, 58, 0, 2);
        player.setClothes(6, 25, 0, 2);
        player.setClothes(4, 35, 0, 2);
        player.setClothes(11, 55, 0, 2);
        super.setWorkingClothesForWoman(player);
    }

    giveInitialSet(player) {
        // Remove all weapons
        player.removeAllWeapons();

        // pistol
        player.giveWeapon(0xBFE256D4, 500);
        // assault tonfa
        player.giveWeapon(0x678B81B1, 500);
        // assault tazer
        player.giveWeapon(0x3656C8C1, 500);
        // assault shotgun
        player.giveWeapon(0x555AF99A, 500);
    }

    finishWork(player) {
        //this.dropMarker.hideFor(player);
        //this.sellMarker.hideFor(player);

        // Remove all weapons
        player.removeAllWeapons();
        super.finishWork(player);
    }


}
new PoliceJob();
