const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const vehicle = require('../../Basic/Vehicles/sVehicle');
const sVehicleSingletone = require('../../Basic/Vehicles/sVehicleSingletone');
const moneySingletone = require('../../Basic/Money/sMoney');
//const sVehicleSingletone = require('../../Basic/Money/sMoney');
const savecoord = "savecoord";
const pickcoord = "pickcoord";

mp.events.add({

    "playerEnterColshape": (player, shape) => {
        if (!player.loggedIn) return;
        player.canOpenGarageMenu = shape.garageId;
        player.garageShapeType = shape.garageShapeType;
        player.notify(`${i18n.get('basic', 'pressEToOpenMenu', player.lang)}`);
    },

    "playerExitColshape": (player, shape) => {
        if (!player.loggedIn) return;
        player.canOpenGarageMenu = -1;
    },
});

class GarageSingleton {
    constructor() {
        this.initSingleton();

        mp.events.add({
            "sKeys-E": (player) => {
                if (!player.loggedIn) return;
                if (misc.isNull(player.canOpenGarageMenu) || player.canOpenGarageMenu <= 0) return;
                var garageObj = this.listGarages.filter(g => g.id === player.canOpenGarageMenu)[0];
                var garage = JSON.stringify(garageObj);
                misc.log.debug("player.garageShapeType: " + player.garageShapeType);

                if (player.garageShapeType === savecoord) {
                    this.buyAndSaveCartInGarage(player, garage);
                } else {
                    this.pickCarFromGarage(player, garage);
                }
            },
            "sGarageSingleton-BuyGarage": (player) => {
                var garage = this.listGarages.filter(g => g.id === player.canOpenGarageMenu)[0];
                buyGarageById(player, garage);
            },
            "sGarageSingleton-SellGarage": (player) => {
                misc.log.debug("sGarageSingleton-SellGarage: " + player.guid);
            },
            "sGarageSingleton-PickVehicle": async (player, vehicle_id) => {


                var vehicleToAdd = misc.isNotNull(player.allVehicles) ? player.allVehicles.filter(v => v.id === vehicle_id)[0] : null;

                if (misc.isNotNull(vehicleToAdd)) {
                    vehicleToAdd.coord = misc.getPlayerCoordJSON(player);

                    new vehicle(vehicleToAdd);
                }
                await this.updateInGarageInDB(player, vehicle_id);
                await this.updatePlayerVehicles(player);

            }
        });
    }

    async updateInGarageInDB(player, vehicle_id) {
        await misc.query(`UPDATE vehicles set ingarage = false where id = ${vehicle_id}`);
    }

    async updatePlayerVehicles(player) {
        sVehicleSingletone.getPlayerVehiclesFromDBAndUpdate(player);
    }

    async initSingleton() {
        this.listGarages = await getAllGarages();
        this.createGarageSavePoints();
        this.createGaragePickPoints();
    }

    async loadPlayerGarages(player) {
        player.playerGarages = await getAllPlayerGarages(player);
    }

    async createGaragePickPoints() {
        this.garagePickPoints = await getAllGaragesCoords(this.listGarages, pickcoord);
        this.createMarkersAndShapes(this.garagePickPoints, pickcoord);
    }

    async createGarageSavePoints() {
        this.garageSavePoints = await getAllGaragesCoords(this.listGarages, savecoord);
        this.createMarkersAndShapes(this.garageSavePoints, savecoord);
    }

    async createMarkersAndShapes(garagePoints, coordType) {
        var color = coordType === savecoord ? [255, 0, 0, 50] : [0, 255, 0, 50];
        var drawInMap = coordType === savecoord;
        for (let i = 0; i < garagePoints.length; i++) {
            const marker = mp.markers.new(36, new mp.Vector3(garagePoints[i].x, garagePoints[i].y, garagePoints[i].z - 1), 3,
                {
                    color: color,
                    visible: true,
                });
            const colshape = mp.colshapes.newSphere(garagePoints[i].x, garagePoints[i].y, garagePoints[i].z, 3);
            colshape.garageId = this.listGarages[i].id;
            colshape.garageShapeType = coordType;

            if (drawInMap) {
                this.blip = mp.blips.new(523, new mp.Vector3(garagePoints[i].x, garagePoints[i].y, garagePoints[i].z),
                    {
                        name: this.listGarages[i].name,
                        shortRange: true,
                        scale: 0.7,
                        color: 69,
                    });
            }
        }
    }

    buyAndSaveCartInGarage(player, garage) {
        var canBuyThisGarage = true;

        player.playerGarages.forEach(element => {
            if (element.garage_id === player.canOpenGarageMenu) {

                misc.log.debug("PLAYER VEHICLE: " + JSON.stringify(player.vehicle));

                if (misc.isNotNull(player.vehicle)) {

                    //settear la flag de la DB
                    updateInGarageDB(player);
                    //despawnear el auto
                    var vehicleToDestroy = player.vehicle;
                    vehicleToDestroy.destroy();

                } else {
                    player.notify(`~r~${i18n.get('sGarage', 'noVehicle', player.lang)}!`);
                }

                canBuyThisGarage = false;
                return;
            }
        });
        if (canBuyThisGarage) {
            let execute = '';
            execute += `app.loadGarage('${garage}');`;
            player.call("cGarageMenu-OpenBuyMenu", [player.lang, execute]);
        }
    }

    pickCarFromGarage(player, garage) {

        var needToBuy = true;

        player.playerGarages.forEach(element => {
            if (element.garage_id === player.canOpenGarageMenu) {
                var allVehicles = misc.isNotNull(player.allVehicles) ? player.allVehicles.filter(v => v.ingarage) : [];
                let execute = '';
                execute += `app.loadGarage('${garage}');`; // JSON.stringify(allVehicles)
                execute += `app.loadVehicles('${JSON.stringify(allVehicles)}');`;
                misc.log.debug("pickCarFromGarage all vehicles : " + JSON.stringify(allVehicles));
                player.call("cGarageMenu-CarSelectMenu", [player.lang, execute]);
                needToBuy = false;
                return;
            }
        });

        if (needToBuy) player.notify(`~r~${i18n.get('sGarage', 'buyGarageError', player.lang)}!`);

    }
}
const garageSingletone = new GarageSingleton();
module.exports = garageSingletone;

async function getAllPlayerGarages(player) {
    return await misc.query(`SELECT * FROM usersGarages where user_id = ${player.guid}`);
}

async function getAllGarages() {
    var garages = await misc.query(`SELECT * FROM garageinformation`);
    garages.forEach(element => {
        element[savecoord] = JSON.parse(element[savecoord]);
        element[pickcoord] = JSON.parse(element[pickcoord]);
    });
    return garages;
}

async function getAllGaragesCoords(listGarages, coords) {
    var coordsArray = [];
    for (var i = 0; i < listGarages.length; i++) {
        var coordsToPush = listGarages[i][coords];
        coordsArray.push(coordsToPush);
    }
    return coordsArray;
}

async function buyGarageById(player, garageToBuy) {
    const canBuy = await player.changeMoney(-garageToBuy.price);
    if (!canBuy) return;

    await misc.query(`INSERT INTO usersGarages VALUES ( ${player.guid}, ${garageToBuy.id})`);

    player.playerGarages.push({ user_id: player.guid, garage_id: garageToBuy.id });

    player.notify(`~r~${i18n.get('sGarage', 'buyGarage', player.lang)}!`);
}

async function updateInGarageDB(player) {
    player.allVehicles.forEach(function (veh) {
        if (veh.id === player.vehicle.guid) {
            veh.ingarage = true;
        }
    });
    misc.log.debug("PLAYER allVehicles : " + JSON.stringify(player.allVehicles));

    await misc.query(`UPDATE vehicles SET ingarage = TRUE where id = ${player.vehicle.guid}`);
}

