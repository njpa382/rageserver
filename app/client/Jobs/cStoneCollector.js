"use strict";

const misc = require('../cMisc');

mp.events.add({
    "cStoneCollector-OpenMainMenu" : (lang, inject) => {
        misc.prepareToCef();
        misc.openCef("package://RP/Browsers/Jobs/StoneCollector/stonecollector.html", lang);
        misc.injectCef(inject);
    },
});       