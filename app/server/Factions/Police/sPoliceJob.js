const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const Job = require('../../Jobs/sJob');
const FactionJob = require('../../Factions/sFactionsJob');
const inventoryManager = require('../../Basic/Inventory/sInventoryManager');

const faction_id_const = 1;



class PoliceJob extends FactionJob {
    constructor() {

        var jobParamenters = {};
        jobParamenters.basicInformation = {
            name: "Police Job", x: 441.211, y: -976.772, z: 30.69, rot: 0,
            dim: 0, faction_id: faction_id_const, className: "sPoliceJob", blipInfo: { id: 526, color: 3 }
        };
        /*jobParamenters.basicInformation = {
            name: "Police", x: 429.284, y: -998.777, z: 25.739, rot: 84.36,
            dim: 0, faction_id: faction_id_const, className: "sPoliceJob"
        };*/

        jobParamenters.pickVehicleCoords = [
            { x: 428.908, y: -1000.204, z: 25.78, rot: 295.54, spawn: { x: 431.2, y: -997.116, z: 25.763, rot: 176.75 } },
            { x: 438.975, y: -999.889, z: 25.774, rot: 173.55, spawn: { x: 436.206, y: -997.36, z: 25.769, rot: 177.29 } },
        ];

        jobParamenters.dropVehicleCoords = [
            { x: 446.895, y: -996.799, z: 25.767, rot: 183.93 },
            { x: 452.167, y: -997.041, z: 25.763, rot: 173.36 },
        ];

        jobParamenters.factionVehiclesList = [
            { model: "police3", minimunRank: 1, title: "Police 3", fuel: 40, id: 0, numberPlate: "POLICE000" },
        ];

        super(jobParamenters);

        mp.events.add({
            "sPoliceJob-removerCargos": async (player, str) => {
                var frontInfo = JSON.parse(str);
                misc.log.debug("sPoliceJob-removerCargos: " + str);
                var targetPlayer = misc.getPlayerById(misc.getGuidFromDNI(frontInfo.targetPlayerInformation.dni));
                this.removeJailHistory(targetPlayer);

            },
            "sPoliceJob-arrestar": async (player, str) => {
                var frontInfo = JSON.parse(str);
                misc.log.debug("sPoliceJob-arrestar: " + str);
                var targetPlayer = misc.getPlayerById(misc.getGuidFromDNI(frontInfo.targetPlayerInformation.dni));
                targetPlayer.startJail();
            },
            "sPoliceJob-multar": async (player, str) => {
                var frontInfo = JSON.parse(str);
                misc.log.debug("sPoliceJob-multar: " + str);
                this.updateMultasActuales(frontInfo.targetPlayerInformation, frontInfo.multaSeleccionada, player.dni);
            },
            "sPoliceJob-confiscar": async (player, str) => {
                var frontInfo = JSON.parse(str);
                var objetoAConfiscar = frontInfo.objetoAConfiscar; 
                var playerToRemoveItem = misc.getPlayerByDNI(frontInfo.targetPlayerInformation.dni);        
                this.confiscarObjeto(objetoAConfiscar, playerToRemoveItem, player);
            },
            "sPoliceJob-esposar": async (player, str) => {
                var frontInfo = JSON.parse(str);
                var targetPlayer = misc.getPlayerById(misc.getGuidFromDNI(frontInfo.targetPlayerInformation.dni));

                if(misc.isNotNull(targetPlayer.isArrested) && targetPlayer.isArrested) {
                    targetPlayer.stopAnimation();
                    targetPlayer.isArrested = false;
                } else {
                    targetPlayer.playAnimation('mp_arresting', 'idle', 1, 2);
                    targetPlayer.isArrested = true;
                }                
                misc.log.debug("sPoliceJob-esposar: " + str);
            }
        });

    }

    async updateMultasActuales(targetPlayerInformation, multaSeleccionada, policeDni) {

        var playerDNI = targetPlayerInformation.dni;
        var multa_id = multaSeleccionada.id;
        var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var policeDni = policeDni;

        //{"date":"12/27/2019, 8:02:14 PM","val":45,"txt":"Transfer to Hospital"}


        var playerToAddFine = misc.getPlayerByDNI(playerDNI);
        playerToAddFine.newFine(multaSeleccionada.price, multaSeleccionada.description);

        //await misc.query(`INSERT INTO multasActuales (playerDNI, multa_id, datetime,policeDni) VALUES ('`+ playerDNI +`',`+ multa_id +`,'`+ datetime +`','`+ policeDni +`')`);
    }

    async confiscarObjeto(itemInformation,playerToRemoveItem, targetPlayer) {
        await inventoryManager.removeFromInventory(playerToRemoveItem, itemInformation.item_id, itemInformation.quantity);
        //TODO: Mandar el objeto a un lugar comun en comisaria. 
    }

    pressedKeyOnMainShape(player) {
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        player.call("sPoliceJob-OpenMainMenu", [player.lang, execute]);
    }

    async removeJailHistory(player) {
        player.removeAllJail();
        player.notify(`~r~${i18n.get('sPoliceJob', 'jailStatusRemoved', player.lang)}!`);
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
            player.call("sPoliceJob-ShowPoliceMenu", [player.lang, execute]);
        }
    }

    async generatePlayerInfo(nearestPlayer) {
        var playerInformation = {};
        playerInformation.dni = nearestPlayer.dni;
        playerInformation.isArrested = misc.isNull(nearestPlayer.isArrested) ? false : nearestPlayer.isArrested;
        playerInformation.fullName = nearestPlayer.firstName + " " + nearestPlayer.lastName;
        playerInformation.invetory = nearestPlayer.inventory;
        playerInformation.cash = nearestPlayer.money.cash;

        this.multasList = await this.getUpdatedMultasFromDB();
        playerInformation.descripcionesMulta = [];

        this.multasList.forEach(element => {
            playerInformation.descripcionesMulta.push(element);
        });

        playerInformation.multasActuales = await this.generateMultasActualesFromDB(nearestPlayer.dni);

        return playerInformation;
    }   
    
    async generateMultasActualesFromDB(playerDni) {
        return await misc.query(`SELECT multasActuales.*,multas.description,multas.price FROM multasActuales, multas where multasActuales.playerDNI = '` + playerDni + `' AND multasActuales.multa_id = multas.id`);
    }

    async getUpdatedMultasFromDB() {
        return await misc.query(`SELECT * FROM multas`);
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
