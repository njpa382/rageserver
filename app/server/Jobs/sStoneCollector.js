const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const CollectorJob = require('./sCollectorJob');
const sInventoryManager = require('../Basic/Inventory/sInventoryManager');


class StoneCollector extends CollectorJob {
    constructor() {
        var childrenInfo = {};
        childrenInfo.d = { name: "Stone Collector", x: 2963.963, y: 2757.009, z: 43.219, rot: 207.19, dim: 0, blipInfo: {id:618, color: 73}};
        childrenInfo.collectorInfo = {
            item_id: 3,
            refined_items_ids: [4,5,6,7],
            refined_items_probability:[30, 85, 99, 100],
            refined_items_prices:[200, 500, 1000, 5000],
            max_item_quantity: 50,
            ilegal:false,
            refined_items_equivalent: 5
        };        
        childrenInfo.posToDrop = {x: 1109.088, y: -2008.24, z: 31.038};
        childrenInfo.sellPosition = {x: -622.361, y: -231.108, z: 38.057};
        childrenInfo.checkPoints = [
            {x: 2970.791, y: 2776.561, z: 38.362 },
            {x: 2950.072, y: 2769.37, z: 38.969 },
            {x: 2970.542, y: 2801.577, z: 41.577 },
        ];
        childrenInfo.treeMarkersList = [];
        
        misc.log.debug("StoneCollector childenInfo: " + JSON.stringify(childrenInfo));
        super(childrenInfo);

        mp.events.add({
            "sStoneCollector-StartWork" : (player) => {
                this.startWork(player);
            },
        
            "sStoneCollector-FinishWork" : (player) => {
                this.finishWork(player);
            }        
        });
    }
    
    pressedKeyOnMainShape(player) {
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        player.call("cStoneCollector-OpenMainMenu", [player.lang, execute]);
        super.pressedKeyOnMainShape(player);
    }

    setWorkingClothesForMan(player) {
        player.setProp(0, 14, 0); // Hat
        player.setClothes(11, 78, misc.getRandomInt(0, 15), 0); // Top
        player.setClothes(3, 14, 0, 0);
        player.setClothes(252, 0, 0, 0);
        player.setClothes(4, 0, misc.getRandomInt(0, 15), 0); // Legs
        super.setWorkingClothesForMan(player);
    }

    setWorkingClothesForWoman(player) {
        player.setProp(0, 14, 0); // Hat
        player.setClothes(11, 78, misc.getRandomInt(0, 7), 0); // Top
        player.setClothes(3, 9, 0, 0);
        player.setClothes(82, 0, 0, 0);
        player.setClothes(4, 1, misc.getRandomInt(0, 15), 0); // Legs
        super.setWorkingClothesForWoman(player);
    }    
}
new StoneCollector();
