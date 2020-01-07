
const misc = require('../cMisc');

mp.events.add(
{
	"cRobo-OpenRoboMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Factions/Police/Robo/activateRobo.html", lang);
		misc.injectCef(inject);
	},
	"cRobo-sendNotifications" : (tittle, subtittle) => {
		mp.game.ui.setNotificationTextEntry("STRING");
		mp.game.ui.setNotificationMessage("CHAR_BANK_MAZE", "CHAR_BANK_MAZE", false, 4, tittle, subtittle);
		mp.game.ui.drawNotification(true, false);
	},
});

