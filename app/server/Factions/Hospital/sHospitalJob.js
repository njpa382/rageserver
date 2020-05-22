const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const Job = require('../../Jobs/sJob');
const FactionJob = require('../../Factions/sFactionsJob');

const faction_id_const = 2;



class HospitalJob extends FactionJob {
    constructor() {

        var jobParamenters = {};
        jobParamenters.basicInformation = {
            name: "Hospital Job", x: 269.299, y: -1361.497, z: 24.538, rot: 0,
            dim: 0, faction_id: faction_id_const, className: "sHospitalJob", blipInfo: { id: 526, color: 3 }
        };
        /*jobParamenters.basicInformation = {
            name: "Police", x: 429.284, y: -998.777, z: 25.739, rot: 84.36,
            dim: 0, faction_id: faction_id_const, className: "sPoliceJob"
        };*/

        jobParamenters.pickVehicleCoords = [
            //{ x: 428.908, y: -1000.204, z: 25.78, rot: 295.54, spawn: { x: 431.2, y: -997.116, z: 25.763, rot: 176.75 } },
            //{ x: 438.975, y: -999.889, z: 25.774, rot: 173.55, spawn: { x: 436.206, y: -997.36, z: 25.769, rot: 177.29 } },
        ];

        jobParamenters.dropVehicleCoords = [
            //{ x: 446.895, y: -996.799, z: 25.767, rot: 183.93 },
            //{ x: 452.167, y: -997.041, z: 25.763, rot: 173.36 },
        ];

        jobParamenters.factionVehiclesList = [
            //{ model: "police3", minimunRank: 1, title: "Police 3", fuel: 40, id: 0, numberPlate: "POLICE000" },
        ];

        super(jobParamenters);

        mp.events.add({
            
        });

    }

    pressedKeyOnMainShape(player) {
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        player.call("cHospital-OpenMainMenu", [player.lang, execute]);
    }    

    async openInteractionMenu(player) {
        if (player.job.isActive && player.faction.faction_id === faction_id_const) {
            const nearestPlayer = misc.getNearestPlayerInRange(player, player.position, 1);
            if (!nearestPlayer) return;
            misc.log.debug("Jugador cercano: " + JSON.stringify(nearestPlayer));

            var playerInformation = await this.generatePlayerInfo(nearestPlayer);

            misc.log.debug("Jugador cercano - playerInformation : " + JSON.stringify(playerInformation));


            let execute = '';
            execute = `app.loadTargetPlayerInformation('${JSON.stringify(playerInformation)}');`;
            player.call("cHospital-ShowHospitalMenu", [player.lang, execute]);
        }
    }

    async generatePlayerInfo(nearestPlayer) {
        var playerInformation = {};
        playerInformation.dni = nearestPlayer.dni;
        playerInformation.isArrested = misc.isNull(nearestPlayer.isArrested) ? false : nearestPlayer.isArrested;
        playerInformation.fullName = nearestPlayer.firstName + " " + nearestPlayer.lastName;
        playerInformation.invetory = nearestPlayer.inventory;
        playerInformation.cash = nearestPlayer.money.cash;

        return playerInformation;
    }   

    setWorkingClothesForMan(player) {
        this.giveInitialSet(player);
        // Set Uniform
        player.setClothes(11, 12, 0, 0); // Tops
		player.setClothes(3, 12, 0, 0); // Tops
		player.setClothes(8, 12, 0, 0); // Tops
		player.setClothes(4, 20, 0, 0); // Legs
        super.setWorkingClothesForMan(player);
    }

    setWorkingClothesForWoman(player) {
        this.giveInitialSet(player);
        // Set Uniform
        player.setClothes(11, 27, 0, 0); // Tops
		player.setClothes(3, 0, 0, 0); // Tops
		player.setClothes(8, 2, 0, 0); // Tops
		player.setClothes(4, 23, 0, 0); // Legs
        super.setWorkingClothesForWoman(player);
    }

    giveInitialSet(player) {
        // Remove all weapons
        player.removeAllWeapons();

        // assault tazer
        player.giveWeapon(0x3656C8C1, 500);
    }

    finishWork(player) {
        //this.dropMarker.hideFor(player);
        //this.sellMarker.hideFor(player);

        // Remove all weapons
        player.removeAllWeapons();
        super.finishWork(player);
    }   

}
new HospitalJob();
