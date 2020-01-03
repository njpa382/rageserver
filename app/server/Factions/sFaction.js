
const misc = require('../sMisc');
const clothes = require('../Character/sClothes');
const i18n = require('../sI18n');
const vehicleSingletone = require('../Basic/Vehicles/sVehicleSingletone');

const factionsList = [];

class faction {
	constructor(factionName, faction_id) {
		this.name = factionName;
		this.faction_id = faction_id;
		this.maxRank = 10;
		vehicleSingletone.loadFactionVehicles(this.name);
		factionsList.push(this);
	}

	createEvents() {
		mp.events.addCommand({
			'invite': async (player, full, player_guid, faction_id, rank) => {
				this.invite(player, full, player_guid, faction_id, rank);
			},

			'setrank': async (player, full, id, rank) => {
				this.setRank(player, id, rank);
			},

			'uninvite': async (player, id) => {
				this.uninvite(player, id);
			},
		});

		mp.events.add({
			"playerEnterColshape": (player, shape) => {
				if (!player.loggedIn || !this.isInThisFaction(player) || shape !== this.clothingShape) return;
				player.faction.canChangeClothes = true;
				player.notify(`${i18n.get('basic', 'pressE', player.lang)} ${i18n.get('sFaction', 'changeClothes', player.lang)}`);
			},

			"playerExitColshape": (player, shape) => {
				if (!player.loggedIn || !this.isInThisFaction(player) || shape !== this.clothingShape) return;
				player.faction.canChangeClothes = false;
			},

			"sKeys-E": (player) => {
				if (!player.loggedIn || !this.isInThisFaction(player) || !player.faction.canChangeClothes) return;
				this.changeClothes(player);
			},
		});
	}

	createClothingShape(pos) {
		this.clothingShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.clothingMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75,
			{
				color: [255, 255, 0, 15],
				visible: true,
			});
	}

	savePlayerData(player) {
		if (!player) return;
		misc.query(`UPDATE usersFaction SET name = '${player.faction.name}', rank = '${player.faction.rank}', info = '${JSON.stringify(player.faction.info)}' WHERE id = '${player.guid}'`);
	}

	updateClothingMarker(player) {
		if (this.isInThisFaction(player)) this.clothingMarker.showFor(player);
		else this.clothingMarker.hideFor(player);
	}

	changeClothes(player) {
		if (this.isWorking(player)) {
			this.setWorking(player, false);
			return clothes.loadPlayerClothes(player);
		}
		this.setWorking(player, true);
		if (player.model === 1885233650) this.changeClothesMan(player); // Dont forget add this method to class
		else this.changeClothesWoman(player);  // Dont forget add this method to class
	}

	isInThisFaction(player) {
		if (!player.faction || player.faction.name !== this.name) return false;
		return true;
	}

	isInOtherFaction(player) {
		if (player.faction.name && player.faction.name !== this.name) return true;
		return false;
	}

	isDistanceRight(player1, player2, showMessToPlayer2 = false) {
		const dist = player1.dist(player2.position);
		if (dist && dist < 2) return true;
		player1.notify(`~r~${player2.name} ${i18n.get('basic', 'tooFarAway', player1.lang)}!`);
		if (showMessToPlayer2) player2.notify(`~r~${player1.name} ${i18n.get('basic', 'tooFarAway', player2.lang)}!`);
		return false;
	}

	isWorking(player) {
		if (player.faction.working) return true;
		return false;
	}

	setWorking(player, status) {
		player.faction.working = status;
	}

	getRank(player) {
		if (!this.isInThisFaction(player)) return;
		return player.faction.rank;
	}

	async setRank(player, id, rank) {	

		/*
		if (!misc.isValueNumber(id) || !misc.isValueNumber(value) || !this.isInThisFaction(leader) || this.getRank(leader) < 9) return;
		const player = mp.players.at(id);
		if (!player || !this.isInThisFaction(player) || !this.isDistanceRight(leader, player)) return;
		player.faction.rank = value;
		this.savePlayerData(player);
		leader.outputChatBox(`!{0, 225, 0}${i18n.get('sFaction', 'setNewRank', leader.lang)} ${player.name}: ${value}`);
		player.outputChatBox(`!{0, 225, 0}${leader.name} ${i18n.get('sFaction', 'changedYourRank', player.lang)} ${value}`);
		misc.log.debug(`${leader.name} sets ${player.name} rank to ${value}`);
		*/
		if (player.adminlvl < 1) return; // AGREegar validacion para ver si es rank 10
		misc.log.debug("SOS ADMIN, realizando cambio...");

		await this.updateRankInDB(id, rank);

		player.outputChatBox(`!{0, 225, 0}${player.name} ${i18n.get('sFaction', 'changedYourRank', player.lang)} ${rank}`);

	}

	async invite(player, fulltext, player_guid, faction_id, rank) {
		/*
		if (!misc.isValueNumber(id) || !this.isInThisFaction(leader) || this.getRank(leader) < 9) return;
		const player = mp.players.at(id);
		if (!player || !this.isDistanceRight(leader, player) || this.isInOtherFaction(player)) return;
		player.faction = {
			name: this.name,
			rank: 1,
			info: false,
		}
		this.savePlayerData(player);
		player.outputChatBox(`!{0, 225, 0}${leader.name} ${i18n.get('sFaction', 'invited', player.lang)} ${this.name}`);
		leader.notify(`~g~${i18n.get('basic', 'success', leader.lang)}!`);
		this.updateClothingMarker(player);
		misc.log.debug(`${leader.name} invited ${player.name} to ${this.name}`);
		*/

		if (player.adminlvl < 1) return; // AGREegar validacion para ver si es rank 10
		await this.addPlayerToFactionDB(player_guid, faction_id, rank); // validar que no este en la faccion previamente y no tenga faccion.
		const playerToAdd = mp.players.at(player_guid);
		player.notify(`~g~${i18n.get('basic', 'success', player.lang)}!`);
		playerToAdd.notify(`~g~${i18n.get('basic', 'success', playerToAdd.lang)}!`);


	}

	async addPlayerToFactionDB(player_guid, faction_id, rank) {
		await misc.query(`INSERT INTO usersfaction VALUES ('${player_guid}', '${faction_id}','${rank}')`);
	}

	async removePlayerFromFactionDB(player_guid) {
		misc.log.debug("removePlayerFromFactionDB player_guid : " + player_guid);
		await misc.query(`DELETE FROM usersfaction where user_id = ${player_guid}`);
	}

	async updateRankInDB(id, rank) {
		misc.log.debug("updateRankInDB id : " + id);
		misc.log.debug("updateRankInDB id : " + rank);
		await misc.query(`UPDATE usersfaction set rank = ${rank} where user_id = ${id}`);
	}

	setAsLeader(admin, id) {
		if (admin.adminlvl < 1) return;
		const player = mp.players.at(id);
		if (!player) return;
		player.faction = {
			name: this.name,
			rank: 10,
			info: false,
		}
		this.savePlayerData(player);
		player.outputChatBox(`!{0, 225, 0}${i18n.get('sFaction', 'leader', player.lang)} ${this.name}`);
		this.updateClothingMarker(player);
		admin.notify(`~g~${i18n.get('basic', 'success', admin.lang)}!`);
		misc.log.debug(`${admin.name} sets ${player.name} as a ${this.name} leader`);
	}

	async uninvite(player, id) {
		misc.log.debug("EXPULSANDO ..." + id );
		/*
		if (!misc.isValueNumber(id) || !this.isInThisFaction(leader) || this.getRank(leader) < 9) return;
		const player = mp.players.at(id);
		if (!player || !this.isInThisFaction(player)) return;
		player.faction = {
			name: false,
		};
		this.savePlayerData(player);
		misc.query(`UPDATE faction SET name = NULL WHERE id = '${player.basic.id}'`);
		player.outputChatBox(`!{225, 0, 0}${leader.name} ${i18n.get('sFaction', 'uninvited', player.lang)} ${this.name}`);
		leader.notify(`~g~${i18n.get('basic', 'success', leader.lang)}!`);
		this.updateClothingMarker(player);
		clothes.loadPlayerClothes(player);
		misc.log.debug(`${leader.name} uninvited ${player.name} from ${this.name}`);
		*/
		var idToRemove;
		if (player.adminlvl < 1) {
			idToRemove = player.guid;
		} else {
			idToRemove = id;
		}

		misc.log.debug("EXPULSANDO ..." + idToRemove );

		await this.removePlayerFromFactionDB(idToRemove);

		player.outputChatBox(`!{225, 0, 0}${player.name} ${i18n.get('sFaction', 'uninvited', player.lang)}`);
	}	

	updateLastOfferTime(player) {
		player.faction.lastOfferTime = new Date().getTime();
	}

	getLastOfferTime(player) {
		return player.faction.lastOfferTime;
	}

	setCurrentClient(player, client) {
		if (!this.isInThisFaction(player) || !this.isWorking(player)) return false;
		const currentTime = new Date().getTime();
		const lastOfferTime = this.getLastOfferTime(player);
		const time = ((currentTime - lastOfferTime) / 1000).toFixed();

		if (lastOfferTime && time < 60) {
			player.notify(`${i18n.get('basic', 'wait', player.lang)} ${60 - time} ${i18n.get('basic', 'seconds', player.lang)}`);
			return false;
		}
		this.updateLastOfferTime(player);

		player.faction.currentClient = client.id;
		client.faction.currentSeller = player.id;
		return true;
	}

	getCurrentClient(player) {
		return player.faction.currentClient;
	}

	getCurrentSeller(client) {
		return client.faction.currentSeller;
	}

	resetCurrentClient(player) {
		player.faction.currentClient = false;
	}

	resetCurrentSeller(client) {
		client.faction.currentSeller = false;
	}

	isSellerClientRight(seller, client) {
		const clientSellerId = this.getCurrentSeller(client);
		const sellerClientId = this.getCurrentClient(seller);
		if (seller.id === clientSellerId && client.id === sellerClientId) return true;
		return false;
	}


}
module.exports = faction;


async function createNewUser(id) {
	//await misc.query(`INSERT INTO usersFaction (id, info) VALUES ('${id}', '[]')`);
}
module.exports.createNewUser = createNewUser;


async function loadUser(player) {
	const d = await misc.query(`SELECT * FROM usersfaction f1 INNER JOIN factions f2 ON f1.faction_id = f2.id WHERE f1.user_id = '${player.guid}' LIMIT 1`);
	if (misc.isNotNull(d[0])) {
		player.faction = {
			name: d[0].name,
			rank: d[0].rank,
			faction_id: d[0].faction_id,
			//LARGUI, LOS SIGUIENTES DOS PARAMETROS NO EXISTEN EN LA CONSULTA
			//info:  JSON.parse(d[0].info),
			//working: false,
		}

	} else {
		player.faction = {
			name: "Ciudadano",
			rank: 0,
			faction_id: 0,
			//info:  "",
			//working: false,
		}

	}

	misc.log.debug("PLAYER faction object : " + JSON.stringify(player.faction));

	for (const f of factionsList) {
		if (f.isInThisFaction(player)) return f.updateClothingMarker(player);
	}

}
module.exports.loadUser = loadUser;