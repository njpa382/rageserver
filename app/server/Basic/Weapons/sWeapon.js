
const misc = require('../../sMisc');
const i18n = require('../../sI18n');


class Weapon {
	constructor () {
		
	}

}
module.exports = new Weapon();

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
	let weaponHash = mp.joaat(weapon);
	player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
  });