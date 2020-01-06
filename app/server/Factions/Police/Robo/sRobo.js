
const misc = require('../../../sMisc');

mp.events.add({
    "playerEnterColshape" : (player, shape) => {
        if (!player.loggedIn || player.vehicle) return;
        //detectar que robo se esta ejecutando y agregarlo a player.
    },

    "playerExitColshape" : (player, shape) => {
        //detectar si esta en un robo, de esta shape y cancelar el robo. 
    },
    
    "sKeys-E" : (player) => {
        if (!player.loggedIn) return;
        //abrir menu para ver si quiere robar o no este territorio.
    },

});

class Robo {
    constructor() {
        this.robo = [
            {    
                id: 1,
                name: "Banco Central",
                dineroTotal:100000,
                tiempoTotal:60,
                tiempoTick:10,
                dineroTick: 1000,
                startTime: 30,
                coord: { x: 255.447, y: 224.548, z: 100.876, rot: 50 } 
            }
        ];
        this.createRoboLocations();
    }    

    createRoboLocations() {
        this.robo.forEach(element => {
            var dropMarker = mp.markers.new(1, new mp.Vector3(element.coord.x, element.coord.y, element.coord.z), 5,
                {
                    color: [0, 160, 0, 30],
                    visible: true,
                });

            var dropShape = mp.colshapes.newSphere(element.coord.x, element.coord.y, element.coord.z, 5.5);
            dropShape.roboShapeType = element.id;
        });
    }
}

const robo = new Robo();
module.exports = robo;