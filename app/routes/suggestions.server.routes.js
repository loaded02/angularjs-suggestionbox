var users = require('../../app/controllers/users.server.controller'),
    suggestions = require('../../app/controllers/suggestions.server.controller');

module.exports = function (app) {
    app.route('/api/suggestions')
        .get(suggestions.list)
        .post(users.requiresLogin, suggestions.create);

    app.route('/api/suggestions/:suggestionId')
        .get(suggestions.read)
        .put(users.requiresLogin, suggestions.hasAuthorization, suggestions.update)
        .delete(users.requiresLogin, suggestions.hasAuthorization, suggestions.delete);

    app.route('/api/suggestions/:suggestionId/comments')
        .put(users.requiresLogin, suggestions.putComment);

    app.route('/api/suggestions/:suggestionId/upvote')
        .put(users.requiresLogin, suggestions.putUpvote);

    app.param('suggestionId', suggestions.suggestionByID);
}