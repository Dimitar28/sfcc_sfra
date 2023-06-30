'use strict';

var server = require('server');
var HookMgr = require('dw/system/HookMgr');

server.extend(module.superModule);
server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();

    // Invoke the custom hook
    viewData.customData = {
        key: 'value',
        anotherKey: 'anotherValue'
    };
    res.setViewData(viewData);

    if (HookMgr.hasHook("app.custom.home.show")) {
        HookMgr.callHook('app.custom.home.show', 'extendViewData', res)
    }

    next();
});

module.exports = server.exports();