'use strict'
var server = require('server');
/*  Show example a */
server.get("ShowA", function (req, res, next) {
    res.render("examplea")
    next();
})

/*  Show example b */
server.get("ShowB", function (req, res, next) {
    res.render("exampleb")
    next();
})
module.exports = server.exports();