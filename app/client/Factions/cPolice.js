
const misc = require('../cMisc');

mp.events.add(
{

	/* "cHospital-ShowDoctorMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Factions/Hospital/interactiveMenu.html", lang);
		misc.injectCef(inject);
	}, */
	"sPoliceJob-OpenMainMenu" : (lang, inject) => {
		misc.prepareToCef(500);
		misc.openCef("package://RP/Browsers/Factions/Police/policeJob.html", lang);
		misc.injectCef(inject);
	},

});
