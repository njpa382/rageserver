const misc = require('../sMisc');
const i18n = require('../sI18n');
const Job = require('./sJob');
const sInventoryManager = require('../Basic/Inventory/sInventoryManager');
const mariaItem_id = 1;
const refinedMariaItem_id = 2;
const maxMariaQuantity = 50;
const refinedMariaEquivalent = 5;


class MariaCollector extends Job {
    constructor() {
        const d = { name: "Maria Collector", x: 2212.994, y: 5577.482, z: 53.786, rot: 0, dim: 0 }
        misc.log.debug("Maria Collector : " + d);
        super(d);
        this.posToDrop = {x: -273.107, y: 2197.09, z: 129.837};
        this.sellPosition = {x: -1172.152, y: -1571.8, z: 4.664};
        this.checkPoints = [
            {x: 2234.38, y: 5577.286, z: 53.932 },
            {x: 2226.166, y: 5578.286, z: 53.932 },
            {x: 2219.275, y: 5575.25, z: 53.932 },
        ];
        this.treeMarkersList = [];


        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if (!player.loggedIn || player.vehicle || !this.isPlayerWorksHere(player)) return;
                if (shape.mariaCollectorTree === player.job.activeTree) {
                    player.playAnimation('anim@mp_snowball', 'pickup_snowball', 1, 47);
                    player.call("cMisc-CallServerEvenWithTimeout", ["sMariaCollector-EnteredTreeShape", 2400]);
                    }
                else if (shape === this.dropShape) {
                    player.playAnimation('anim@mp_snowball', 'pickup_snowball', 1, 47);
                    player.call("cMisc-CallServerEvenWithTimeout", ["sMariaCollector-EnteredDropShape", 2400]);
                } else if (shape === this.sellShape) {
                    player.playAnimation('anim@mp_snowball', 'pickup_snowball', 1, 47);
                    player.call("cMisc-CallServerEvenWithTimeout", ["sMariaCollector-EnteredSellShape", 2400]);
                }
            },

            "sMariaCollector-EnteredTreeShape" : (player) => {                
                this.enteredTreeShape(player);
            },

            "sMariaCollector-EnteredDropShape" : (player) => {
                this.enteredDropShape(player);
            },

            "sMariaCollector-EnteredSellShape" : (player) => {
                this.enteredSellShape(player);
            },
        
            "sMariaCollector-StartWork" : (player) => {
                this.startWork(player);
            },
        
            "sMariaCollector-FinishWork" : (player) => {
                this.finishWork(player);
            },
        
        });

        this.createMenuToDrop();
        this.createMenuTosell();
        this.createCheckpoints();
    }

    setLocalSettings() {
        this.blip.model = 514;
        this.blip.color = 17;
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
            marker.mariaCollectorTree = i;
            this.treeMarkersList.push(marker);
            const colshape = mp.colshapes.newSphere(this.checkPoints[i].x, this.checkPoints[i].y, this.checkPoints[i].z, 3);
            colshape.mariaCollectorTree = i;
        }
    }

    pressedKeyOnMainShape(player) {
        let execute = '';
        if (player.job.name === this.name) execute = `app.loadFinish();`;
        player.call("cMariaCollector-OpenMainMenu", [player.lang, execute]);
    }

    startWork(player) {
        super.startWork(player);
        player.job = { name: this.name, mariaCollected: 0, activeTree: false };
        misc.log.debug("player inventory" + player.inventory);
        player.job.mariaCollected = this.getMariaQuantityFromDB(player);
        misc.log.debug("player.job.mariaCollected" + player.job.mariaCollected);
        if(player.job.mariaCollected < maxMariaQuantity) this.createRandomCheckPoint(player);
        this.dropMarker.showFor(player);
        this.sellMarker.showFor(player);
    }

    setWorkingClothesForMan(player) {
        player.setProp(0, 14, 0); // Hat
        player.setClothes(11, 78, misc.getRandomInt(0, 15), 0); // Top
        player.setClothes(3, 14, 0, 0);
        player.setClothes(252, 0, 0, 0);
        player.setClothes(4, 0, misc.getRandomInt(0, 15), 0); // Legs
    }

    setWorkingClothesForWoman(player) {
        player.setProp(0, 14, 0); // Hat
        player.setClothes(11, 78, misc.getRandomInt(0, 7), 0); // Top
        player.setClothes(3, 9, 0, 0);
        player.setClothes(82, 0, 0, 0);
        player.setClothes(4, 1, misc.getRandomInt(0, 15), 0); // Legs
    }

    createRandomCheckPoint(player) {
        const i = misc.getRandomInt(0, this.checkPoints.length - 1)
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
        var mariaToAdd = misc.getRandomInt(1, 2);
        player.job.mariaCollected += mariaToAdd;
        player.notify(`${i18n.get('sMariaCollector', 'collected1', player.lang)} ~g~${player.job.mariaCollected} ~w~${i18n.get('sMariaCollector', 'collected2', player.lang)}!`);
        sInventoryManager.addToInventory(player, mariaItem_id, mariaToAdd);
        if (player.job.mariaCollected < maxMariaQuantity) return this.createRandomCheckPoint(player);
        this.hideActiveCheckPoint(player);
        player.notify(`~g~${i18n.get('sMariaCollector', 'full', player.lang)}!`);
    }

    enteredDropShape(player) {
        player.stopAnimation();
        if (player.job.mariaCollected === 0) return player.notify(`${i18n.get('sMariaCollector', 'empty', player.lang)}!`);
        
        var amountOfMariaTemp = player.job.mariaCollected;
        var amountOfMariaRest = amountOfMariaTemp % refinedMariaEquivalent;
        var amountOfMariaToProcess = (amountOfMariaTemp - amountOfMariaRest);
        var amountRefinedMaria = amountOfMariaToProcess/refinedMariaEquivalent;        

        sInventoryManager.addToInventory(player, refinedMariaItem_id, amountRefinedMaria);
        sInventoryManager.removeFromInventory(player, mariaItem_id, amountOfMariaToProcess);

        player.job.mariaCollected = amountOfMariaRest;        
        if (!player.job.activeTree) this.createRandomCheckPoint(player);
    }

    enteredSellShape(player) {
        player.stopAnimation();
        var refinedMariaItem = sInventoryManager.getItem(player, refinedMariaItem_id);
        if(misc.isNull(refinedMariaItem)) return player.notify(`${i18n.get('sMariaCollector', 'empty', player.lang)}!`);
        const earnedMoney = refinedMariaItem.quantity * 500;
        player.changeMoney(earnedMoney);
        player.notify(`${i18n.get('basic', 'earned1', player.lang)} ~g~$${earnedMoney}! ~w~${i18n.get('basic', 'earned2', player.lang)}!`);
        misc.log.debug(`${player.name} earned $${earnedMoney} at Maria collector job!`);
        sInventoryManager.removeFromInventory(player, refinedMariaItem_id, refinedMariaItem.quantity);
    }    

    finishWork(player) {
        this.hideActiveCheckPoint(player);
        this.dropMarker.hideFor(player);
        this.sellMarker.hideFor(player);
        super.finishWork(player);
    }

    getMariaQuantityFromDB(player) {        
        var mariaQuantity = 0;
        var mariaItem = sInventoryManager.getItem(player, mariaItem_id);
        if(misc.isNotNull(mariaItem)) { 
            mariaQuantity = mariaItem.quantity;
        }
        return mariaQuantity;
    }
    
}
new MariaCollector();
