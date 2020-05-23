const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const Job = require('../../Jobs/sJob');
const FactionJob = require('../../Factions/sFactionsJob');
const hospitalBuilding = require('./sHospitalBuilding');
const inventoryManager = require('../../Basic/Inventory/sInventoryManager');


const faction_id_const = 2;



class HospitalJob extends FactionJob {
    constructor() {

        var jobParamenters = {};
        jobParamenters.basicInformation = {
            name: "Hospital", x: 269.299, y: -1361.497, z: 24.538, rot: 0,
            dim: 0, faction_id: faction_id_const, className: "sHospitalJob", blipInfo: { id: 61, color: 1 , newPosition: true, x: -496, y:-337 ,z: 34}
        };
        /*jobParamenters.basicInformation = {
            name: "Police", x: 429.284, y: -998.777, z: 25.739, rot: 84.36,
            dim: 0, faction_id: faction_id_const, className: "sPoliceJob"
        };*/

        jobParamenters.pickVehicleCoords = [
            { x: -498.594, y: -341.825, z: 34.502, rot: 262.5, spawn: { x: -488.944, y: -342.966, z: 34.366, rot: 261.19 } },
            //{ x: 438.975, y: -999.889, z: 25.774, rot: 173.55, spawn: { x: 436.206, y: -997.36, z: 25.769, rot: 177.29 } },
        ];

        jobParamenters.dropVehicleCoords = [
            { x: -485.604, y: -331.616, z: 34.364, rot: 83.42 },
            //{ x: 452.167, y: -997.041, z: 25.763, rot: 173.36 },
        ];

        jobParamenters.factionVehiclesList = [
            { model: "ambulance", minimunRank: 1, title: "Ambulance", fuel: 40, id: 0, numberPlate: "AMBULANCE000" },
        ];

        super(jobParamenters);

        mp.events.add({
            "playerDeath" : (player, reason, killer) => {
				//player.call("cMisc-CallServerEvenWithTimeout", ["sHospital-SpawnAfterDeath", 10000]);
                //misc.log.debug("Armas actuales: " + JSON.stringify(player.weapons.all));
                inventoryManager.emptyInventory(player);
                player.removeAllWeapons();
                player.changeMoney(-player.money.cash);
                let killername;
				if (killer) killername = killer.name;
                misc.log.debug(`${player.name} death! Reason: ${reason}, killer: ${killername}`);
                this.openDeathMenu(player);
            },            

            "sHospital-SpawnAfterDeath" : (player) => {
				this.spawnAfterDeath(player);
			},
        });
    }

    async openDeathMenu(player) {
        let execute = '';
        execute = `app.targetPlayerInformation('${JSON.stringify(player)}');`;
        player.call("cHospital-OpenDeathMenu", [player.lang, execute]);        
    }

    spawnAfterDeath(player) {
		if (!player.loggedIn) return;
		player.spawn(new mp.Vector3(player.position));
		player.health = 1;
		player.call("cHospital-DisableHealthRegeneration");
		player.healingSpeed = 0;
		const posToDrop = { x: -498.184, y: -335.741, z: 34.502 };
		const dist = player.dist(posToDrop);
		const pay = misc.roundNum(dist / 20);
		player.newFine(pay, `${i18n.get('sHospital', 'transferTo', player.lang)}`);

		const tp = { x: 275.446, y: -1361.11, z: 24.5378, rot: 46.77, dim: 0 };
		player.tp(tp);
		misc.log.debug(`${player.name} transfered to Hospital. Fine: $${pay}`);
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

function loadUser(player) {
	player.call("cHospital-DisableHealthRegeneration");
	player.healingSpeed = 0;
	player.canStartHeal = false;

	player.stopHealing = function() {
		if (this.healingSpeed === 0) return;
		this.healingSpeed = 0;
		this.outputChatBox(`!{0, 200, 0}${i18n.get('sHospital', 'finishedHealing', this.lang)}!`);
		misc.log.debug(`${this.name} finished healing. HP: ${this.health}`);
	}
	
	player.startHealing = function() {
		if (this.healingSpeed > 0) return;
		this.healingSpeed = 25;
		player.outputChatBox(`!{0, 200, 0}${i18n.get('sHospital', 'startedHealing', this.lang)}!`);
		misc.log.debug(`${this.name} start healing. HP: ${this.health}`);
	}

	player.addHP = function() {
		if (this.healingSpeed === 0) return;
		this.health += this.healingSpeed;
		this.notify(`~g~+ ${this.healingSpeed}hp`);
		misc.log.debug(`${this.name} got ${this.healingSpeed}hp. Total: ${this.health}`);
		if (this.health <= 100) return;
		this.health = 100;
		this.stopHealing();
	}
}
module.exports.loadUser = loadUser;
