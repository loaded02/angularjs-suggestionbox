var users = require('../../app/controllers/users.server.controller'),
    comments = require('../controllers/comments.server.controller.js');

module.exports = function (app) {
    app.route('/api/comments')
        .get(comments.list)
        .post(users.requiresLogin, comments.create);

    app.route('/api/comments/:commentId')
        .get(comments.read)
        .put(user.requiresLogin, comments.hasAuthorization, comments.update)
        .delete(users.requiresLogin, comments.hasAuthorization, comments.delete);

    app.param('commentId', comments.commentByID);
}