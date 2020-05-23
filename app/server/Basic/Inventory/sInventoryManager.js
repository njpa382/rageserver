

const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const playerSingleton = require('../sPlayer');


class InventorySingleton {
	constructor() {

		/*mp.events.add({	
			"sInventoryManager-OpenInventory" : (player) => {
                
			},
			"sInventoryManager-LoadInventory" : (player) => {
                const playerInventory = await misc.query(`SELECT * FROM inventory WHERE user_id = '${player.id}'`);
            },
		});*/

	}	

	async loadInventory(player) {	
		this.updateInventory(player);
	}	

	async addToInventory(player, item_id, quantity) {
		if(this.existItem(player, item_id)) { 
			var item = this.getItem(player,item_id);
			item.quantity += quantity;
			await misc.query(`UPDATE inventory SET quantity='${item.quantity}' WHERE user_id = '${player.guid}' AND item_id ='${item.item_id}'`);			
		} else {
			await misc.query(`INSERT INTO inventory VALUES ('${player.guid}','${item_id}','${quantity}')`);
		}
		this.updateInventory(player);
	}

	async removeFromInventory(player, item_id, quantity) {
		
		if (this.existItem(player, item_id)) {
			var item = this.getItem(player, item_id);
			item.quantity -= quantity;

			if (item.quantity <= 0) {
				await misc.query(`DELETE from inventory WHERE user_id = '${player.guid}' AND item_id ='${item.item_id}'`);
			} else {
				await misc.query(`UPDATE inventory SET quantity='${item.quantity}' WHERE user_id = '${player.guid}' AND item_id ='${item.item_id}'`);
			}

			this.updateInventory(player);
		}
	}

	async updateInventory(player) {		
		var inv = await misc.query(`SELECT inv.*, items.name, items.description FROM inventory AS inv INNER JOIN items ON inv.item_id = items.item_id WHERE user_id = '${player.guid}'`);
		//misc.log.debug("Inventory Keys during update: " + Object.keys(inv[0]));
		player.inventory = misc.isNotNull(inv) ? inv : [];
		this.updatePlayerWeapons(player);
	}

	updatePlayerWeapons(player) {
		player.inventory.forEach(element => { 
			if(misc.isNotNull(element.realName)) {
				misc.log.debug("Arma en inventario: " + element.realName);
			}
		});
	}

	existItem(player, item_id) {
		return misc.isNotNull(this.getItem(player,item_id));
	}

	getItem(player, item_id) {
		return player.inventory.filter(p=>p.item_id == item_id)[0];
	}
	
	getInventory(player){
		var adasdas = JSON.stringify(player.inventory);
		misc.log.debug("get Inventory JSON: " + adasdas);
		return adasdas;
	}
}

function logInventory(logInventory) {
	misc.log.debug("InventoryManager - item: " + logInventory.item_id + " -Cantidad:  " + logInventory.quantity );
}

const inventorySingletone = new InventorySingleton();
module.exports = inventorySingletone;

mp.events.addCommand(
{
	'inventory' : (player) => {		
		//Get all inventory
		player.outputChatBox("Elementos en tu inventario: ");
		player.inventory.forEach(element => {	
			misc.log.debug("Inventory Keys: " + Object.keys(element));
			player.outputChatBox(element.name + " - Quantity: " + element.quantity);
		});
	},
	
});    
