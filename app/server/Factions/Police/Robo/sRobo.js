
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
        if (misc.isNotNull(shape.roboInformation) && !roboInProgress) {
            player.robo = JSON.parse(JSON.stringify(shape.roboInformation));
        }
        //detectar que robo se esta ejecutando y agregarlo a player.
    },

    "playerExitColshape": (player, shape) => {
        //detectar si esta en un robo, de esta shape y cancelar el robo.

        if (misc.isNotNull(player.robo)) {
            if (player.robo.player_id === player.guid) {
                if (roboInProgress) {
                    player.notify(`${i18n.get('sPoliceJob', 'roboFinalizado', player.lang)} ~g~$${player.robo.dineroRobado}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
                    player.notify(`~r~${i18n.get('sPoliceJob', 'stopRobo', player.lang)}!`);
                    notifyPolice(player.robo, "Robo de banco Cancelado", player.robo.name);
                    removeMoneyFromBankInDB(player.robo, player.robo.dineroRobado);
                }
                player.robo.dineroRobado = 0;
                clearInterval(player.robo.intervalRobo);
                clearTimeout(player.robo.timeOut);
                clearTimeout(player.robo.ticktimeOut);
            }
        }
        player.robo = null;

        //player.robo.inProgress = false;

    },

    "sKeys-E": (player) => {
        if (!player.loggedIn) return;
        if (misc.isNull(player.robo)) return;
        if (roboInProgress) {
            player.notify(`~r~${i18n.get('sPoliceJob', 'otroRoboProgreso', player.lang)}!`);
            return;
        }
        player.robo.player_id = player.guid;
        let execute = '';
        execute += `app.loadRobo('${JSON.stringify(player.robo)}');`;
        player.call("cRobo-OpenRoboMenu", [player.lang, execute]);
    },

});

class Robo {
    constructor() {

        this.generateInitialRobos();

        mp.events.add({
            "sRobo-StartRobo": async (player, str) => {
                player.notify(`~r~${i18n.get('sPoliceJob', 'startRobo', player.lang)}!`);
                var frontInfo = JSON.parse(str);
                roboInProgress = true;
                this.startTimer(player);
                notifyPolice(player.robo, "Robo de banco iniciado", player.robo.name);
                createMapDraw(player.robo.coord, player.robo.name);
            }
        });
    }

    async generateInitialRobos() {
        await this.updateRoboList();
        this.createRoboLocations();
    }

    async updateRoboList() {
        this.roboList = await this.getUpdatedRobosFromDB();

        this.roboList.forEach(element => {
            element.coord = JSON.parse(element.coord);
        });
    }

    async startTimer(player) {
        player.robo.dineroRobado = 0;
        this.setTickTimer(player);
        this.setCompleteTimer(player);
    }

    async getUpdatedRobosFromDB() {
        return await misc.query(`SELECT * FROM robos`);
    }

    setTickTimer(player) {
        player.robo.ticktimeOut = setTimeout(function () {
            robarTick(player);
            player.robo.intervalRobo = setInterval(function () {
                robarTick(player);
            }, ((player.robo.tiempoTotal - 30) / tickDivided) * 1000);
        }, player.robo.policeResponseTime * 1000);
    }

    setCompleteTimer(player) {
        player.robo.timeOut = setTimeout(function () {
            clearInterval(player.robo.intervalRobo);

            robarCompletado(player);
            //Actualizar los robos de en la DB y en memoria.            
        }, player.robo.tiempoTotal * 1000);
    }

    createRoboLocations() {
        this.shapes = [];
        this.roboList.forEach(element => {
            mp.markers.new(1, new mp.Vector3(element.coord.x, element.coord.y, element.coord.z), 5,
                {
                    color: [0, 160, 0, 30],
                    visible: true,
                });

            var roboShape = mp.colshapes.newSphere(element.coord.x, element.coord.y, element.coord.z, 5.5);
            roboShape.roboInformation = element;
            this.shapes.push(roboShape);
        });
    }

    reinitShapes() {
        this.shapes.forEach(shape => {
            shape.destroy();
        });
        this.shapes = [];
        this.roboList.forEach(element => {
            var roboShape = mp.colshapes.newSphere(element.coord.x, element.coord.y, element.coord.z, 5.5);
            roboShape.roboInformation = element;
            this.shapes.push(roboShape);
        });
    }

    async rellenarRoboTick() {

        if (roboInProgress) return;
        //TODO: SE PUEDE MEJORAR aun mas!!!

        
        for ( var i = 0 ; i < this.roboList.length ; i ++ ) {
            var element = this.roboList[i];
            if (element.dineroMaximo !== element.dineroActual) {
                var cantidadDineroParaAgregar = (element.dineroMaximo * element.reposicionPorcentageTick) / 100;
                var dineroActualProyectado = element.dineroActual + cantidadDineroParaAgregar;
                dineroActualProyectado = dineroActualProyectado > element.dineroMaximo ? element.dineroMaximo : dineroActualProyectado;
                await misc.query(`UPDATE robos set dineroActual = ${dineroActualProyectado} where id = ${element.id}`);
            }
        }

        await this.updateRoboList();
        this.reinitShapes();
    }

}

const roboObject = new Robo();
module.exports = roboObject;

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

function robarTick(player) {
    var dineroARobar = (tickPorcentage * player.robo.dineroActual) / 100;
    player.robo.dineroRobado += dineroARobar;
    player.notify(`${i18n.get('basic', 'earned1', player.lang)} ~g~$${dineroARobar}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
    inventory.addToInventory(player, dineroSucioId, dineroARobar);

}

function robarCompletado(player) {
    var dineroSucioCantidad = player.robo.dineroActual - ((tickTotalPorcentage * player.robo.dineroActual) / 100);
    player.robo.dineroRobado += dineroSucioCantidad;
    inventory.addToInventory(player, dineroSucioId, dineroSucioCantidad);
    player.notify(`${i18n.get('sPoliceJob', 'roboFinalizado', player.lang)} ~g~$${player.robo.dineroActual}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
    removeMoneyFromBankInDB(player.robo, player.robo.dineroRobado);
}

async function removeMoneyFromBankInDB(robo, dineroADescontar) {
    //${summ}
    //await misc.query(`UPDATE robos where id = ${robo.id}`);
    if (roboInProgress) {
        //actualizar base de datos
        var dineroEnBanco = robo.dineroActual - dineroADescontar;
        dineroEnBanco = dineroEnBanco < 0 ? 0 : dineroEnBanco;
        await misc.query(`UPDATE robos set dineroActual = ${dineroEnBanco} where id = ${robo.id}`);
        await roboObject.updateRoboList();
        roboObject.reinitShapes();
        roboInProgress = false;
    }
}
