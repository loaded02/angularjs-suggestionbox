var users = require('../../app/controllers/users.server.controller'),
    suggestions = require('../controllers/suggestions.server.controller.js');

module.exports = function (app) {
    app.route('/api/suggestions')
        .get(suggestions.list)
        .post(users.requiresLogin, suggestions.create);

    app.route('/api/suggestions/:suggestionId')
        .get(suggestions.read)
        .put(user.requiresLogin, suggestions.hasAuthorization, suggestions.update)
        .delete(users.requiresLogin, suggestions.hasAuthorization, suggestions.delete);

    app.param('suggestionId', suggestions.suggestionByID);
}