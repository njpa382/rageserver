
const misc = require('../../../sMisc');
const i18n = require('../../../sI18n');
const inventory = require('../../../Basic/Inventory/sInventoryManager');
const dineroSucioId = 8;
const tickDivided = 10;
const tickPorcentage = 2;
const tickTotalPorcentage = tickPorcentage * tickDivided;
var roboInProgress = false;

mp.events.add({
    "playerEnterColshape": (player, shape) => {
        if (!player.loggedIn || player.vehicle) return;
        if (misc.isNotNull(shape.roboInformation)) {
            player.robo = JSON.parse(JSON.stringify(shape.roboInformation));
        }
        //detectar que robo se esta ejecutando y agregarlo a player.
    },

    "playerExitColshape": (player, shape) => {
        //detectar si esta en un robo, de esta shape y cancelar el robo.
        if (misc.isNotNull(player.robo)) {
            if (player.robo.inProgress) {
                player.notify(`~r~${i18n.get('sPoliceJob', 'stopRobo', player.lang)}!`);
                notifyPolice(player.robo, "Robo de banco Cancelado", player.robo.name);
            }
            clearInterval(player.robo.intervalRobo);
            clearTimeout(player.robo.timeOut);
            clearTimeout(player.robo.ticktimeOut);

        }
        //player.robo.inProgress = false;
        player.robo = null;
        roboInProgress = false;
    },

    "sKeys-E": (player) => {
        if (!player.loggedIn) return;
        if (misc.isNull(player.robo) || player.robo.inProgress) return;
        if(roboInProgress) {
            player.notify(`~r~${i18n.get('sPoliceJob', 'otroRoboProgreso', player.lang)}!`);
            return;
        }
        let execute = '';
        execute += `app.loadRobo('${JSON.stringify(player.robo)}');`;
        player.call("cRobo-OpenRoboMenu", [player.lang, execute]);
    },

});

class Robo {
    constructor() {
        this.roboList = [
            {
                id: 0,
                name: "Banco Central",
                dineroActual: 100000,
                dineroMaximo: 100000,
                tiempoTotal: 120,
                policeResponseTime: 30,
                coord: { x: 255.447, y: 224.548, z: 100.876, rot: 50 }
            }
        ];
        this.createRoboLocations();

        mp.events.add({
            "sRobo-StartRobo": async (player, str) => {
                player.notify(`~r~${i18n.get('sPoliceJob', 'startRobo', player.lang)}!`);
                var frontInfo = JSON.parse(str);
                player.robo.inProgress = true;
                roboInProgress = true;
                this.startTimer(player);//
                notifyPolice(player.robo, "Robo de banco iniciado", player.robo.name);
                createMapDraw(player.robo.coord, player.robo.name);
            }
        });
    }

    async startTimer(player) {
        this.setTickTimer(player);
        this.setCompleteTimer(player);
    }

    setTickTimer(player) {

        player.robo.ticktimeOut = setTimeout(function () {
            player.robo.intervalRobo = setInterval(function () {
                misc.log.debug("Evento TICK");
                player.notify(`${i18n.get('basic', 'earned1', player.lang)} ~g~$${(tickPorcentage * player.robo.dineroActual) / 100}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
                inventory.addToInventory(player, dineroSucioId, (tickPorcentage * player.robo.dineroActual) / 100);
            }, ((player.robo.tiempoTotal - 30) / tickDivided) * 1000);
        }, player.robo.policeResponseTime * 1000);
    }

    setCompleteTimer(player) {
        player.robo.timeOut = setTimeout(function () {
            player.robo.inProgress = false;
            roboInProgress = false;
            clearInterval(player.robo.intervalRobo);
            misc.log.debug("ROBO COMPLETO");
            var dineroSucioCantidad = player.robo.dineroActual - ((tickTotalPorcentage * player.robo.dineroActual) / 100);
            inventory.addToInventory(player, dineroSucioId, dineroSucioCantidad);
            player.notify(`${i18n.get('sPoliceJob', 'roboFinalizado', player.lang)} ~g~$${player.robo.dineroActual}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
        }, player.robo.tiempoTotal * 1000);
    }

    createRoboLocations() {
        this.roboList.forEach(element => {
            mp.markers.new(1, new mp.Vector3(element.coord.x, element.coord.y, element.coord.z), 5,
                {
                    color: [0, 160, 0, 30],
                    visible: true,
                });

            var roboShape = mp.colshapes.newSphere(element.coord.x, element.coord.y, element.coord.z, 5.5);
            roboShape.roboInformation = element;
        });
    }
}

const robo = new Robo();
module.exports = robo;

function notifyPolice(robo, tittle, subtittle) {
    var players = misc.getAllPlayer();
    players.forEach(player => {
        player.call("cRobo-sendNotifications", [tittle, subtittle]);
    });
}

function createMapDraw(coords, buldingName) {

    var policeBlip = mp.blips.new(642, new mp.Vector3(coords.x, coords.y, coords.z),
        {
            name: buldingName,
            scale: 1,
            color: 1,
            alpha: 0,
        });

    setTimeout(function () {
        policeBlip.destroy();
    }, 120 * 1000);
}
