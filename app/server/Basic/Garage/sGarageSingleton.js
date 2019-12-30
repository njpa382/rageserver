const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const moneySingletone = require('../../Basic/Money/sMoney');
const savecoord = "savecoord";
const pickcoord = "pickcoord";

mp.events.add({

    "playerEnterColshape": (player, shape) => {
        if (!player.loggedIn) return;
        player.canOpenGarageMenu = shape.garageId;
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
                var canBuyThisGarage = true;
                var garageObj = this.listGarages.filter(g => g.id === player.canOpenGarageMenu)[0];
                var garage = JSON.stringify(garageObj);
                player.playerGarages.forEach(element => {
                    if (element.garage_id === player.canOpenGarageMenu) {
                        //abrir lista de vehiculos
                        /*let execute = '';
                        execute += `app.loadGarage('${garage}');`;
                        execute += `app.loadPlayer('${player}');`;
                        player.call("cGarageMenu-CarSelectMenu", [player.lang, execute]);*/

                        misc.log.debug("PLAYER VEHICLE: " + JSON.stringify(player.vehicle));

                        if (misc.isNotNull(player.vehicle)) {
                            //despawnear el auto
                            var vehicleToDestroy = player.vehicle;
                            vehicleToDestroy.destroy();
                            //settear la flag de la DB
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

            },
            "sGarageSingleton-BuyGarage": (player) => {
                var garage = this.listGarages.filter(g => g.id === player.canOpenGarageMenu)[0];
                buyGarageById(player, garage);
            },
            "sGarageSingleton-SellGarage": (player) => {
                misc.log.debug("sGarageSingleton-SellGarage: " + player.guid);
            },
            "sGarageSingleton-PickVehicle": (player) => {
                misc.log.debug("sGarageSingleton-PickVehicle: " + player.guid);
            }
        });
    }

    async initSingleton() {
        this.listGarages = await getAllGarages();
        this.createGarageSavePoints();
    }

    async loadPlayerGarages(player) {
        player.playerGarages = await getAllPlayerGarages(player);
    }

    async createGarageSavePoints() {
        this.garageSavePoints = await getAllGaragesCoords(this.listGarages, savecoord);
        for (let i = 0; i < this.garageSavePoints.length; i++) {

            const marker = mp.markers.new(36, new mp.Vector3(this.garageSavePoints[i].x, this.garageSavePoints[i].y, this.garageSavePoints[i].z - 1), 3,
                {
                    color: [255, 165, 0, 50],
                    visible: true,
                });
            const colshape = mp.colshapes.newSphere(this.garageSavePoints[i].x, this.garageSavePoints[i].y, this.garageSavePoints[i].z, 3);
            colshape.garageId = this.listGarages[i].id;
            this.blip = mp.blips.new(523, new mp.Vector3(this.garageSavePoints[i].x, this.garageSavePoints[i].y, this.garageSavePoints[i].z),
                {
                    name: this.listGarages[i].name,
                    shortRange: true,
                    scale: 0.7,
                    color: 17,
                });
        }
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
