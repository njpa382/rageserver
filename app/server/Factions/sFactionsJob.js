const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('../Jobs/sJob');
const VehicleSingletone = require('../Basic/Vehicles/sVehicleSingletone');
const Vehicle = require('../Basic/Vehicles/sVehicle');
const pickVehicleCoords_id = 1;
const dropVehicleCoords_id = 2;


class FactionJob extends Job {
    constructor(jobParamenters) {

        super(jobParamenters.basicInformation);
        this.pickVehicleCoords = jobParamenters.pickVehicleCoords;
        this.dropVehicleCoords = jobParamenters.dropVehicleCoords;
        this.faction_id = jobParamenters.basicInformation.faction_id;
        this.className = jobParamenters.basicInformation.className;
        this.factionVehiclesList = jobParamenters.factionVehiclesList;

        mp.events.add({

            "playerEnterColshape": (player, shape) => {
                misc.log.debug("sFaction : playerEnterColshape");
                if (!player.loggedIn || !this.isPlayerWorksHere(player)) return;

                misc.log.debug("shape.factionShapeType: " + shape.factionShapeType);
                misc.log.debug("shape.spawnCoords: " + shape.spawnCoords);
                player.job.vehicleSpawnCoords = shape.spawnCoords;
                player.canOpenFaction = shape.factionShapeType;               

            },

            "playerExitColshape": (player, shape) => {
                if (!player.loggedIn) return;
                player.canOpenFaction = -1;
                player.job.vehicleSpawnCoords = undefined;
            },

            "sFactionJob-EnteredTreeShape": (player) => {
                //this.enteredTreeShape(player);
            },

            "sFactionJob-EnteredDropShape": (player) => {
                //this.enteredDropShape(player);
            },

            "sFactionJob-EnteredSellShape": (player) => {
                //this.enteredSellShape(player);
            },

            "sKeys-F4" : (player) => {
                if (!player.loggedIn) return;
				this.openInteractionMenu(player);
			},

            "sFactionJob-StartWork": (player) => {
                this.startWork(player);
            },

            "sFactionJob-FinishWork": (player) => {
                this.finishWork(player);
            },

            "sKeys-E": (player) => {
                if (!player.loggedIn) return;
                if (player.canOpenFaction > 0 && (misc.isNull(player.cdSpawnVehicle) || !player.cdSpawnVehicle)) {
                    //player.notify(`${i18n.get('basic', 'pressEToOpenMenu', player.lang)}`);

                    //misc.log.debug("player.canOpenFaction: " + JSON.stringify(d.coord));
                    switch (player.canOpenFaction) {
                        case 1:
                            this.showSelectVehicleMenu(player);
                            break;
                        case 2:
                            this.dropVehicleToGarage(player);
                            break;
                    }
                }
            },

        });

        this.createPickVehicleLocatins();
        this.createDropVehicleLocatins();
    }

    async dropVehicleToGarage(player) {
        //settear la flag de la DB
        await misc.query(`UPDATE vehicles SET ingarage = TRUE where id = ${player.vehicle.guid}`);
        //despawnear el auto
        var vehicleToDestroy = player.vehicle;
        vehicleToDestroy.destroy();
    
    }    

    openInteractionMenu(player) {        
        misc.log.debug("NO TIENE MENU ESTA FACCION");
    }

    showSelectVehicleMenu(player) {
        if (!this.isPlayerWorksHere(player)) return false;
        var allVehicles = misc.isNotNull(this.factionVehiclesList) ? this.factionVehiclesList : [];
        /*allVehicles.forEach(function(item){
            item.whoCanOpen = JSON.stringify([player.guid]);
        });*/

        var garage = {
            id:0,
            name: this.name + " Garage",
            savecoord: {},
            pickcoord: player.job.vehicleSpawnCoords,
            price: 0,
            playerRank: player.faction.rank
        };
        let execute = '';
        execute += `app.loadGarage('${JSON.stringify(garage)}');`; // JSON.stringify(allVehicles)
        execute += `app.loadVehicles('${JSON.stringify(allVehicles)}');`;
        execute += `app.isPersonalGarage('false');`;
        //misc.log.debug("pickCarFromGarage all vehicles : " + JSON.stringify(allVehicles));
        misc.log.debug("pickCarFromGarage all vehicles : " + JSON.stringify(allVehicles));
        misc.log.debug("pickCarFromGarage garage : " + JSON.stringify(garage));
        player.call("cGarageMenu-CarSelectMenu", [player.lang, execute]);
    }    

    spawnAnyVehicle(player) {
        misc.log.debug("player.job.vehicleSpawnCoords: " + player.job.vehicleSpawnCoords);
        var spawnFactionVehicle = {
            model: 'ambulance',
            coord: player.job.vehicleSpawnCoords,
            id: 0,
            title: 'Policia',
            fuel: 1,
            fuelTank: 5,
            fuelRate: 2,
            price: 1,
            ownerId: 0,
            whoCanOpen: JSON.stringify([player.guid]),
            factionName: '',
            numberPlate: misc.generateRandomNumberPlate(),
            primaryColor: JSON.stringify([255, 255, 255]),
            secondaryColor: JSON.stringify([255, 255, 255])
        }
        misc.log.debug("faction vehicle spawn: " + spawnFactionVehicle);
        new Vehicle(spawnFactionVehicle);
        player.cdSpawnVehicle = true;
        setTimeout(function () { player.cdSpawnVehicle = false; }, 10000);
    }

    createPickVehicleLocatins() {
        this.pickVehicleCoords.forEach(element => {
            var dropMarker = mp.markers.new(36, new mp.Vector3(element.x, element.y, element.z), 0.75,
                {
                    color: [0, 255, 0, 100],
                    visible: true,
                });

            var dropShape = mp.colshapes.newSphere(element.x, element.y, element.z, 1);
            dropShape.factionShapeType = pickVehicleCoords_id;
            dropShape.spawnCoords = element.spawn;
        });
    }

    createDropVehicleLocatins() {
        this.dropVehicleCoords.forEach(element => {
            var dropMarker = mp.markers.new(36, new mp.Vector3(element.x, element.y, element.z), 0.75,
                {
                    color: [255, 0, 0, 100],
                    visible: true,
                });

            var dropShape = mp.colshapes.newSphere(element.x, element.y, element.z, 1);
            dropShape.factionShapeType = dropVehicleCoords_id;
        });
    }

    setWorkingClothesForMan(player) {
        super.setWorkingClothesForMan(player);
    }

    setWorkingClothesForWoman(player) {
        super.setWorkingClothesForWoman(player);
    }

    isFromThisFaction(player) {
        misc.log.debug("player.faction.faction_id: " + player.faction.faction_id);
        misc.log.debug("this.faction_id: " + this.faction_id);
        misc.log.debug("this.className: " + this.className);
        misc.log.debug("this.blipInfo: " + this.blipInfo);
        return player.faction.faction_id === this.faction_id;
    }

    startWork(player) {
        if (this.isFromThisFaction(player)) {
            super.startWork(player);
            player.job = { name: this.name, faction_id: this.faction_id, isActive: true };
        } else {
            player.notify(`~r~${i18n.get(this.className, 'younotinthisfaction', this.lang)}!`);
        }

        //this.dropMarker.showFor(player);
        //this.sellMarker.showFor(player);
    }

    finishWork(player) {
        //this.dropMarker.hideFor(player);
        //this.sellMarker.hideFor(player);

        super.finishWork(player);
    }


}


module.exports = FactionJob;
