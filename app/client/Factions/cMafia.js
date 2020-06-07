
const misc = require('../cMisc');

mp.events.add(
{
	"cMafia-Yakuza-OpenMainMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Factions/Mafia/Yakuza/mafiaJob.html", lang);
		misc.injectCef(inject);
	},
});
