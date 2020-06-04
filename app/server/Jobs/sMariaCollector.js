const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const CollectorJob = require('./sCollectorJob');
const sInventoryManager = require('../Basic/Inventory/sInventoryManager');


class MariaCollector extends CollectorJob {
    constructor() {
        var childrenInfo = {};
        childrenInfo.d = { name: "Maria Collector", x: 2212.994, y: 5577.482, z: 53.786, rot: 0, dim: 0, blipInfo: {id:140, color: 25}};
        childrenInfo.collectorInfo = {
            item_id: 1,
            refined_items_ids: [2],
            refined_items_probability:[100],
            refined_items_prices:[500],
            ilegal:true,
            max_item_quantity: 50,
            refined_items_equivalent: 5
        };        
        childrenInfo.posToDrop = {x: -273.107, y: 2197.09, z: 129.837};
        childrenInfo.sellPosition = {x: -1172.152, y: -1571.8, z: 4.664};
        childrenInfo.checkPoints = [
            {x: 2234.38, y: 5577.286, z: 53.932 },
            {x: 2226.166, y: 5578.286, z: 53.932 },
            {x: 2219.275, y: 5575.25, z: 53.932 },
        ];
        childrenInfo.treeMarkersList = [];
        
        misc.log.debug("childenInfo: " + JSON.stringify(childrenInfo));
        super(childrenInfo);
        
        mp.events.add({
            "sMariaCollector-StartWork" : (player) => {
                this.startWork(player);
            },
        
            "sMariaCollector-FinishWork" : (player) => {
                this.finishWork(player);
            }        
        });
    }
    
    pressedKeyOnMainShape(player) {
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        player.call("cMariaCollector-OpenMainMenu", [player.lang, execute]);
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
new MariaCollector();
