/* eslint-disable eol-last */
/* eslint-disable no-param-reassign */
'use strict';
var HookMgr = require('dw/system/HookMgr');
module.exports = function extendViewDataHook(view, callback) {
    if (HookMgr.hasHook('dw.extend.home')) {
        HookMgr.callHook('dw.extend.home');
    }
    view.customData2 = {
        key: 'value2',
        anotherKey: 'anotherValue2'
    };
    callback();
};