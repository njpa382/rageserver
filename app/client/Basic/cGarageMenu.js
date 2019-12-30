"use strict";

const misc = require('../cMisc');

mp.events.add({
    "cGarageMenu-OpenBuyMenu" : (lang, inject) => {
        misc.prepareToCef();
        misc.openCef("package://RP/Browsers/Garages/buygarage.html", lang);
        misc.injectCef(inject);
    },
    "cGarageMenu-CarSelectMenu" : (lang, inject) => {
        misc.prepareToCef();
        misc.openCef("package://RP/Browsers/Garages/selectgarage.html", lang);
        misc.injectCef(inject);
    },
});       