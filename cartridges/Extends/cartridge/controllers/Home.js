
'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();

    viewData.customData = {
        key: 'value',
        anotherKey: 'anotherValue'
    };
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
