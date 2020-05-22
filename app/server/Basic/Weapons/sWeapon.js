
const misc = require('../../sMisc');
const i18n = require('../../sI18n');
const weaponSlots = new Set([1993361168,1277010230,932043479,690654591,1459198205,195782970,-438797331,896793492,495159329,-1155528315,-515636489,-871913299,-1352759032,-542958961,1682645887,-859470162,-2125426402,2067210266,-538172856,1783244476,439844898,-24829327,1949306232,-1941230881,-1033554448,320513715,-695165975,-281028447,-686713772,347509793,1769089473,189935548,248801358,386596758,-157212362,436985596,-47957369, 575938238]);


class Weapon {
	constructor () {
		
	}

}
module.exports = new Weapon();

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
	let weaponHash = mp.joaat(weapon);
	player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
  });

  mp.events.addCommand("weapons", (player, fullText) => {	
	misc.log.debug("---Pruebas de armas ---");
	//misc.log.debug("Armas del juegador: " + JSON.stringify(player.allWeapons));
	var allWeapons = getAllWeapons();
	allWeapons.forEach(element => {
		misc.log.debug("---Pruebas de armas ---> " + element);
    })

  });

  function getAllWeapons() {
    const weapons = {};
    weaponSlots.forEach(weaponSlot => {
        const weapon = getWeaponTypeInSlot(weaponSlot);
        if (weapon !== 0) {
            weapons[weapon] = { ammo: getAmmoWeapon(weapon) };
        }
    });
    return weapons;
}