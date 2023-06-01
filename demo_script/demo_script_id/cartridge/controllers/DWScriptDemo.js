/* eslint-disable no-unused-lets */
/* eslint-disable sitegenesis/no-global-require */
'use strict';

/**
 * @namespace DWScriptDemo
 */

let server = require('server');
let cache = require('*/cartridge/scripts/middleware/cache');
let consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
let pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
let userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
let DWScriptModel = require('*/cartridge/models/dwscript');
/**
 * DWScriptDemo-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/DWScriptDemo-Show
 * @function
 * @memberof DWScriptDemo
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, userLoggedIn.validateLoggedIn, function (req, res, next) {
    let Site = require('dw/system/Site');
    let pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    let dwScriptModel = new DWScriptModel(customer);
    res.render('DWScriptDemo', dwScriptModel);
    next();
}, pageMetaData.computedPageMetaData);

server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

module.exports = server.exports();
