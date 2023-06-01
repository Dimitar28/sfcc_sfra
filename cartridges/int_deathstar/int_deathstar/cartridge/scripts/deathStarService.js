/* eslint-disable no-unused-vars */
/* eslint-disable sitegenesis/no-global-require */
'use strict';

function getdeathStarFacts() {

    var getdeathStarService = dw.svc.LocalServiceRegistry.createService("http.deathstar.getinfo", {
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET");
            return args
        },
        parseResponse: function (svc, client) {
            return client.text
        },
        filterLogMessage: function (msg) {
            return msg.replace("cost_in_credits", "$$$$$$$$$$$$$$$$$$$");
        }
    })
    var response = getdeathStarService.call().object;
    return response
}

module.exports = {
    getdeathStarFacts: getdeathStarFacts
}
