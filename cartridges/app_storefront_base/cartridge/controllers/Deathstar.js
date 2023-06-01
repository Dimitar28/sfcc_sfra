/* eslint-disable no-unused-vars */
/* eslint-disable sitegenesis/no-global-require */
'use strict';

/**
 * @namespace Cat
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var deathStarService = require('*/cartridge/scripts/deathStarService.js');
/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Deathstar-Fact : This endpoint is called to show info about the Deathstar
 * @name Base/Deathstar-Fact
 * @function
 * @memberof Deathstar
 */
server.get('Facts', cache.applyDefaultCache, function (req, res, next) {

    // var httpClient = new dw.net.HTTPClient();
    // httpClient.open('GET', 'https://catfact.ninja/fact');
    // httpClient.send();

    var deathstarfact = JSON.parse(deathStarService.getdeathStarFacts())
    res.render('home/deathstar', {
        deathstarfact: deathstarfact
    });
    next();
},);

module.exports = server.exports();
