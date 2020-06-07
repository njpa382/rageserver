const FactionJob = require('../../Factions/sFactionsJob');
const misc = require('../../sMisc');


class Mafia extends FactionJob {
    constructor(jobParamenters) {        

        super(jobParamenters);

        mp.events.add({
            
        });
    }

    pressedKeyOnMainShape(player) {
        misc.log.debug("Abriendo Menu de mafia");
        
        /*misc.log.debug("this.faction_id: " + this.faction_id);
        misc.log.debug("player.job.name: " + player.job.name);
        misc.log.debug("this.name: " + this.name);
        
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        
        if (player.faction.faction_id == this.faction_id) {
            player.call("sPoliceJob-OpenMainMenu", [player.lang, execute]);
        }*/
    }

    setWorkingClothesForMan(player) {
        // Set Uniform
        player.setClothes(3, 0, 0, 2);
        player.setClothes(8, 58, 0, 2);
        player.setClothes(6, 25, 0, 2);
        player.setClothes(4, 35, 0, 2);
        player.setClothes(11, 55, 0, 2);
        super.setWorkingClothesForMan(player);
    }

    setWorkingClothesForWoman(player) {
        // Set Uniform
        player.setClothes(3, 0, 0, 2);
        player.setClothes(8, 58, 0, 2);
        player.setClothes(6, 25, 0, 2);
        player.setClothes(4, 35, 0, 2);
        player.setClothes(11, 55, 0, 2);
        super.setWorkingClothesForWoman(player);
    }
}
module.exports = Mafia;