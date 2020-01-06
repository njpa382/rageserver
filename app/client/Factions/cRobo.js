
const misc = require('../cMisc');

mp.events.add(
{
	"cRobo-OpenRoboMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Factions/Police/Robo/activateRobo.html", lang);
		misc.injectCef(inject);
	},
});
