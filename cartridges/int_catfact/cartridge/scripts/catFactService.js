/* eslint-disable no-unused-vars */
/* eslint-disable sitegenesis/no-global-require */
'use strict';

function getCatFact() {

    var getGetFactService = dw.svc.LocalServiceRegistry.createService("http.catfact.getcatfact", {
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET");
            return args
        },
        parseResponse: function (svc, client) {
            return client.text
        }
    })
    var response = getGetFactService.call().object;
    return response
}

module.exports = {
    getCatFact: getCatFact
}
