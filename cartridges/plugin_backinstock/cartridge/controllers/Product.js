
'use strict';

var server = require('server');

server.extend(module.superModule);

/** Product-Show : This endpoint is called to show the details of the selected product 
 * and it is extended to store the pid in a custom session variable called productID 
* @name Base/Product-Show
* @function
* @memberof Product
* @param {category} - non-sensitive
* @param {querystringparameter} - pid - Product ID
* @param {serverfunction} - append
 * */
server.append('Show', function (req, res, next) {
    session.custom.productID = req.httpParameterMap.get('pid').value;
    next();
});

module.exports = server.exports();