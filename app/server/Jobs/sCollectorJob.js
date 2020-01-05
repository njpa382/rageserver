const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const sInventoryManager = require('../Basic/Inventory/sInventoryManager');


class CollectorJob extends Job {
    constructor(childrenInfo) {
        super(childrenInfo.d);
        this.collectorInfo = childrenInfo.collectorInfo;
        this.posToDrop = childrenInfo.posToDrop;
        this.sellPosition = childrenInfo.sellPosition;
        this.checkPoints = childrenInfo.checkPoints;
        this.treeMarkersList = childrenInfo.treeMarkersList;

        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;
                if (misc.isNotNull(player.job.name) && player.job.name !== this.name) return;
                misc.log.debug("playerEnterColshape player.job: " + JSON.stringify(player.job));
                if (shape.activeCollectorTree === player.job.activeTree) {
                    player.playAnimation('anim@mp_snowball', 'pickup_snowball', 1, 47);
                    player.call("cMisc-CallServerEvenWithTimeout", ["sCollectorJob-EnteredTreeShape", 2400]);
                } else if (shape === this.dropShape) {
                    player.playAnimation('anim@mp_snowball', 'pickup_snowball', 1, 47);
                    player.call("cMisc-CallServerEvenWithTimeout", ["sCollectorJob-EnteredDropShape", 2400]);
                } else if (shape === this.sellShape) {
                    player.playAnimation('anim@mp_snowball', 'pickup_snowball', 1, 47);
                    player.call("cMisc-CallServerEvenWithTimeout", ["sCollectorJob-EnteredSellShape", 2400]);
                }
            },

            "sCollectorJob-EnteredTreeShape" : (player) => {     
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;
                if (misc.isNotNull(player.job.name) && player.job.name !== this.name) return;
                misc.log.debug("EnteredTreeShape player.job: " + JSON.stringify(player.job));
                this.enteredTreeShape(player);
            },

            "sCollectorJob-EnteredDropShape" : (player) => {
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;
                if (misc.isNotNull(player.job.name) && player.job.name !== this.name) return;
                misc.log.debug("EnteredDropShape player.job: " + JSON.stringify(player.job));
                this.enteredDropShape(player);
            },

            "sCollectorJob-EnteredSellShape" : (player) => {
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;
                if (misc.isNotNull(player.job.name) && player.job.name !== this.name) return;
                misc.log.debug("EnteredSellShape player.job: " + JSON.stringify(player.job));
                this.enteredSellShape(player);
            }        
        });

        this.createMenuToDrop();
        this.createMenuTosell();
        this.createCheckpoints();
    }

    createMenuToDrop() {
        this.dropMarker = mp.markers.new(1, new mp.Vector3(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z - 1), 0.75,
        {
            color: [255, 165, 0, 100],
            visible: false,
        });
        this.dropShape = mp.colshapes.newSphere(this.posToDrop.x, this.posToDrop.y, this.posToDrop.z, 1);
    }

    createMenuTosell() {
        this.sellMarker = mp.markers.new(1, new mp.Vector3(this.sellPosition.x, this.sellPosition.y, this.sellPosition.z - 1), 0.75,
        {
            color: [255, 165, 0, 100],
            visible: false,
        });
        this.sellShape = mp.colshapes.newSphere(this.sellPosition.x, this.sellPosition.y, this.sellPosition.z, 1);
    }

    createCheckpoints() {
        for (let i = 0; i < this.checkPoints.length; i++) {
            const marker = mp.markers.new(1, new mp.Vector3(this.checkPoints[i].x, this.checkPoints[i].y, this.checkPoints[i].z - 1), 3,
            {
                color: [255, 165, 0, 50],
                visible: false,
            });
            marker.activeCollectorTree = i;
            this.treeMarkersList.push(marker);
            const colshape = mp.colshapes.newSphere(this.checkPoints[i].x, this.checkPoints[i].y, this.checkPoints[i].z, 3);
            colshape.activeCollectorTree = i;
        }
    }

    pressedKeyOnMainShape(player) { }

    setWorkingClothesForMan(player) { }

    setWorkingClothesForWoman(player) { }

    startWork(player) {
        super.startWork(player);
        player.job = { name: this.name, itemCollected: 0, activeTree: false };
        player.job.itemCollected = this.getItemQuantityFromDB(player);
        misc.log.debug("player.job: " + JSON.stringify(player.job));
        if(player.job.itemCollected < this.collectorInfo.max_item_quantity) this.createRandomCheckPoint(player);
        this.dropMarker.showFor(player);
        this.sellMarker.showFor(player);
    }

    createRandomCheckPoint(player) {
        const i = misc.getRandomInt(0, this.checkPoints.length - 1);
        if (i === player.job.activeTree) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        this.treeMarkersList[i].showFor(player);
        player.job.activeTree = i;
        return i;
    }

    hideActiveCheckPoint(player) {
        const i = player.job.activeTree;
        if (typeof i !== "number") return;
        this.treeMarkersList[i].hideFor(player);
        player.job.activeTree = false;
    }

    enteredTreeShape(player) {
        player.stopAnimation();
        var itemsToAdd = misc.getRandomInt(1, 2);
        player.job.itemCollected += itemsToAdd;
        player.notify(`${i18n.get('sMariaCollector', 'collected1', player.lang)} ~g~${player.job.itemCollected} ~w~${i18n.get('sMariaCollector', 'collected2', player.lang)}!`);
        sInventoryManager.addToInventory(player, this.collectorInfo.item_id, itemsToAdd);
        if (player.job.itemCollected < this.collectorInfo.max_item_quantity) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~${i18n.get('sMariaCollector', 'full', player.lang)}!`);
    }

    enteredDropShape(player) {
        player.stopAnimation();
        if (player.job.itemCollected === 0) return player.notify(`${i18n.get('sMariaCollector', 'empty', player.lang)}!`);
        
        var amountOfItemsTemp = player.job.itemCollected;
        var amountOfItemsRest = amountOfItemsTemp % this.collectorInfo.refined_items_equivalent;
        var amountOfItemsToProcess = (amountOfItemsTemp - amountOfItemsRest);
        var amountRefinedItems = amountOfItemsToProcess / this.collectorInfo.refined_items_equivalent;

        var arrayRefinedItems = this.generateRefinedItemsArray(amountRefinedItems);
        
        misc.log.debug("generateRefinedItemsArray ids: " + JSON.stringify(this.collectorInfo.refined_items_ids));
        misc.log.debug("generateRefinedItemsArray quantity: " + JSON.stringify(arrayRefinedItems));
        for(var i = 0 ; i < arrayRefinedItems.length; i++){
            if(arrayRefinedItems[i] > 0){
                sInventoryManager.addToInventory(player, this.collectorInfo.refined_items_ids[i], arrayRefinedItems[i]);
                var refinedItem = sInventoryManager.getItem(player, this.collectorInfo.refined_items_ids[i]);
                if(misc.isNotNull(refinedItem)) {
                    misc.log.debug("refinedItem: " + JSON.stringify(refinedItem));
                    player.notify(`Has recibido ${arrayRefinedItems[i]} de ${refinedItem.name}!`);
                }
            }
        }

        sInventoryManager.removeFromInventory(player, this.collectorInfo.item_id, amountOfItemsToProcess);
        player.job.itemCollected = amountOfItemsRest;        
        if (!player.job.activeTree) this.createRandomCheckPoint(player);
    }

    enteredSellShape(player) {
        player.stopAnimation();
        var contNulls = 0;
        for(var i = 0; i < this.collectorInfo.refined_items_ids.length; i++){
            var refinedItem = sInventoryManager.getItem(player, this.collectorInfo.refined_items_ids[i]);
            if(misc.isNotNull(refinedItem)) {
                var earnedMoney = refinedItem.quantity * this.collectorInfo.refined_items_prices[i];
                player.changeMoney(earnedMoney);
                player.notify(`${i18n.get('basic', 'earned1', player.lang)} ~g~$${earnedMoney}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
                sInventoryManager.removeFromInventory(player, this.collectorInfo.refined_items_ids[i], refinedItem.quantity);
            }
            else{
                contNulls++;
            }
        }
        if(contNulls === this.collectorInfo.refined_items_ids.length) return player.notify(`${i18n.get('sMariaCollector', 'empty', player.lang)}!`);
    }

    finishWork(player) {
        this.hideActiveCheckPoint(player);
        this.dropMarker.hideFor(player);
        this.sellMarker.hideFor(player);
        super.finishWork(player);
    }

    getItemQuantityFromDB(player) {        
        var itemQuantity = 0;
        var item = sInventoryManager.getItem(player, this.collectorInfo.item_id);
        if(misc.isNotNull(item)) { 
            itemQuantity = item.quantity;
        }
        return itemQuantity;
    }

    generateRefinedItemsArray(amountRefinedItems){
        var refinedItems = [];
        this.collectorInfo.refined_items_ids.forEach(function(item){
            refinedItems.push(0);
        });
        for(var i = 0; i<amountRefinedItems; i++){
            var rnd = misc.getRandomInt(0, 1000) / 10;
            for(var j = 0; this.collectorInfo.refined_items_probability.length; j++){
                if(rnd <= this.collectorInfo.refined_items_probability[j]){
                    refinedItems[j]++;
                    break;
                }
            }
        }
        return refinedItems;
    }
    
}
module.exports = CollectorJob;