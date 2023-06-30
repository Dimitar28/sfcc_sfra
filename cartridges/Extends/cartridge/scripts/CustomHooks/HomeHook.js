/* eslint-disable eol-last */
/* eslint-disable no-param-reassign */
'use strict';
function extendViewData(res) {
    var viewData = res.getViewData();

    // Extend the view data with another JSON object
    viewData.anotherCustomData = {
        key1: 'value1',
        anotherKey1: 'anotherValue1'
    };

    res.setViewData(viewData);
    res.json(viewData)
};
exports.extendViewData = extendViewData;