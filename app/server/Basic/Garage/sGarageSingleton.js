const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const savecoord = "savecoord";
const pickcoord = "pickcoord";


mp.events.add({


    "playerEnterColshape" : (player, shape) => {
		if (!player.loggedIn) return;
        player.canOpenGarageMenu = true;
		player.notify(`${i18n.get('basic', 'pressEToOpenMenu', player.lang)}`);
	},
	
	"playerExitColshape" : (player, shape) => {
		if (!player.loggedIn) return;
		player.canOpenGarageMenu = false;	
    },
           
    "sKeys-E" : (player) => {
        if (!player.loggedIn) return;
        if (!player.canOpenGarageMenu) return;
        misc.log.debug("OPRIMIO E - Player :" + player.guid);
    },

});

class GarageSingleton {
    constructor() {
        misc.log.debug("INICIALIZANDO GARAGES");
        this.createGarageSavePoints();
    }    

    async loadPlayerGarages(player) {
        misc.log.debug("LOADING player GARAGES: " + player.guid);
    }

    async createGarageSavePoints() {
        this.garageSavePoints = await getAllGaragesCoords(savecoord);

        for (let i = 0; i < this.garageSavePoints.length; i++) {

            misc.log.debug("LOADING Garage coords: " + this.garageSavePoints[i].x + " | " +  this.garageSavePoints[i].y + " | "+  this.garageSavePoints[i].z);

            const marker = mp.markers.new(36, new mp.Vector3(this.garageSavePoints[i].x, this.garageSavePoints[i].y, this.garageSavePoints[i].z - 1), 3,
                {
                    color: [255, 165, 0, 50],
                    visible: true,
                });
            //marker.mariaCollectorTree = i;
            //this.treeMarkersList.push(marker);
            const colshape = mp.colshapes.newSphere(this.garageSavePoints[i].x, this.garageSavePoints[i].y, this.garageSavePoints[i].z, 3);
            //colshape.mariaCollectorTree = i;
            this.blip = mp.blips.new(523, new mp.Vector3(this.garageSavePoints[i].x, this.garageSavePoints[i].y, this.garageSavePoints[i].z),
                {
                    name: "Garage",
                    shortRange: true,
                    scale: 0.7,
                    color: 17,
                });
        }
    }

}
const garageSingletone = new GarageSingleton();
module.exports = garageSingletone;

async function getAllGaragesCoords(coords) {
    //misc.log.debug("query de garages: SELECT "+ coords+" FROM garageinformation")
    var garagesCoords = await misc.query(`SELECT ${coords} FROM garageinformation`);
    misc.log.debug("garagesCoords : " + JSON.stringify(garagesCoords));
    misc.log.debug("garagesCoords.length : " + garagesCoords.length);
    var coordsArray = [];
    for(var i = 0; i < garagesCoords.length; i++){

        var coordsToPush = garagesCoords[i][coords];
        misc.log.debug("coordsToPush : " + coordsToPush);
        coordsArray.push(JSON.parse(coordsToPush));
    }
    return coordsArray;
}
