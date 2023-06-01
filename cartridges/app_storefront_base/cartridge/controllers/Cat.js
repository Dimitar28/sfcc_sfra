/* eslint-disable no-unused-vars */
/* eslint-disable sitegenesis/no-global-require */
'use strict';

/**
 * @namespace Cat
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var catFactService = require('*/cartridge/scripts/catFactService.js');
/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Cat-Fact : This endpoint is called to show a random cat fact
 * @name Base/Cat-Fact
 * @function
 * @memberof Cat
 */
server.get('Fact', cache.applyDefaultCache, function (req, res, next) {

    // var httpClient = new dw.net.HTTPClient();
    // httpClient.open('GET', 'https://catfact.ninja/fact');
    // httpClient.send();

    var message = JSON.parse(catFactService.getCatFact())
    res.render('home/cat', {
        quote: message[0].q,
        author: message[0].a
    });
    next();
},);

module.exports = server.exports();
