'use strict';

const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/**
 * @name notifyProductInStock
 * @function
 * @returns {Object} Service configuration
 */
function notifyProductInStock() {
    const response = LocalServiceRegistry.createService("http.message.send", {
        createRequest: function (svc, args) {
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
            svc.setRequestMethod('POST');

            return `To=${args.To}&From=+12176693156&Body=${args.Body}`;
        },
        parseResponse: function (svc, client) {
            return client.text
        },
    });

    return response;
}

module.exports = {
    notifyProductInStock: notifyProductInStock,
}