/**
 * Created by moritz on 08.09.16.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model');
    require('../app/models/suggestion.server.model');

    return db;
}