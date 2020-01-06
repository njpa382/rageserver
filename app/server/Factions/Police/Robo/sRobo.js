
const misc = require('../../../sMisc');
const i18n = require('../../../sI18n');
const inventory = require('../../../Basic/Inventory/sInventoryManager');
const dineroSucioId = 8;

mp.events.add({
    "playerEnterColshape": (player, shape) => {
        if (!player.loggedIn || player.vehicle) return;
        player.robo = JSON.parse(JSON.stringify(shape.roboInformation));
        //detectar que robo se esta ejecutando y agregarlo a player.
    },

    "playerExitColshape": (player, shape) => {
        //detectar si esta en un robo, de esta shape y cancelar el robo.
        if (misc.isNotNull(player.robo) ) {
            clearInterval(player.robo.intervalRobo);
            clearTimeout(player.robo.timeOut);
        }
        //player.robo.inProgress = false;
        player.robo = null;
    },

    "sKeys-E": (player) => {
        if (!player.loggedIn) return;
        if (misc.isNull(player.robo) || player.robo.inProgress) return;
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
                dineroTotal: 100000,
                tiempoTotal: 60,
                tiempoTick: 10,
                dineroTick: 1000,
                startTime: 30,
                inProgress: false,
                coord: { x: 255.447, y: 224.548, z: 100.876, rot: 50 }
            }
        ];
        this.createRoboLocations();

        mp.events.add({
            "sRobo-StartRobo": async (player, str) => {
                var frontInfo = JSON.parse(str);
                player.robo.inProgress = true;
                this.startTimer(player);
            }
        });
    }

    async startTimer(player) {
        this.setTickTimer(player);
        this.setCompleteTimer(player);
    }

    setTickTimer(player) {
        player.robo.intervalRobo = setInterval(function () {
            misc.log.debug("Evento TICK");
            player.notify(`${i18n.get('basic', 'earned1', player.lang)} ~g~$${player.robo.dineroTick}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
            inventory.addToInventory(player, dineroSucioId, player.robo.dineroTick);
        }, player.robo.tiempoTick * 1000);
    }

    setCompleteTimer(player) {
        player.robo.timeOut = setTimeout(function(){
            player.robo.inProgress = false;
            clearInterval(player.robo.intervalRobo);
            misc.log.debug("ROBO COMPLETO");
            inventory.addToInventory(player, dineroSucioId, player.robo.dineroTotal);
            player.notify(`${i18n.get('basic', 'earned1', player.lang)} ~g~$${player.robo.dineroTotal}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
        }, player.robo.tiempoTotal * 1000);
    }

    createRoboLocations() {
        this.roboList.forEach(element => {
            var dropMarker = mp.markers.new(1, new mp.Vector3(element.coord.x, element.coord.y, element.coord.z), 5,
                {
                    color: [0, 160, 0, 30],
                    visible: true,
                });

            var dropShape = mp.colshapes.newSphere(element.coord.x, element.coord.y, element.coord.z, 5.5);
            dropShape.roboInformation = element;
        });
    }
}

const robo = new Robo();
module.exports = robo;