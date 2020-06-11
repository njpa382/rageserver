const FactionJob = require('../../Factions/sFactionsJob');
const misc = require('../../sMisc');


class Mafia extends FactionJob {
    constructor(jobParamenters) {        

        super(jobParamenters);

        mp.events.add({
            
        });
    }    

    setWorkingClothesForMan(player) {
        // Set Uniform
        /*player.setClothes(3, 0, 0, 2);
        player.setClothes(8, 58, 0, 2);
        player.setClothes(6, 25, 0, 2);
        player.setClothes(4, 35, 0, 2);
        player.setClothes(11, 55, 0, 2);
        super.setWorkingClothesForMan(player);*/
    }

    setWorkingClothesForWoman(player) {
        // Set Uniform
        /*player.setClothes(3, 0, 0, 2);
        player.setClothes(8, 58, 0, 2);
        player.setClothes(6, 25, 0, 2);
        player.setClothes(4, 35, 0, 2);
        player.setClothes(11, 55, 0, 2);
        super.setWorkingClothesForWoman(player);*/
    }
}
module.exports = Mafia;