/* eslint-disable no-unused-vars */
/* eslint-disable sitegenesis/no-global-require */
'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');

    res.render('telerik/test', {
        welcomeMsg: 'Welcome user'
    });
    next();
}, pageMetaData.computedPageMetaData);
server.get('Include', function (req, res, next) {
    var Site = require('dw/system/Site');

    res.render('telerik/include', {
        welcomeMsg: 'Welcome user'
    });
    next();
}, pageMetaData.computedPageMetaData);

server.get('List', function (req, res, next) {
    let ProductSearchModel = require('dw/catalog/ProductSearchModel');
    let results = new ProductSearchModel()
    let query = req.httpParameterMap.query
    let format = req.httpParameterMap.format
    results.setSearchPhrase(query)
    results.search()
    res.render('telerik/searchResults', {
        searchResults: results,
        query: query,
        format: format
    });
    next();
}, pageMetaData.computedPageMetaData);

server.get('ShowContent', function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var cid = req.httpParameterMap.cid
    var content = ContentMgr.getContent(cid)
    res.render('telerik/contentAsset', {
        content: content,
        cid: cid
    })
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();