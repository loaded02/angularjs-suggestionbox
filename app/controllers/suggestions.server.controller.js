var mongoose = require('mongoose'),
    Suggestion = mongoose.model('Suggestion');

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName];
        }
    } else {
        return 'Unknown server error.';
    }
};

exports.create = function (req, res) {
    var suggestion = new Suggestion(req.body);
    suggestion.creator = req.user;

    suggestion.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(suggestion);
        }
    });
};

exports.list = function (req, res) {
    Suggestion.find().sort('-created')
        .populate('creator', 'firstName lastName fullName')
        .populate('comments', 'created title creator upVotes')
        .exec(function (err, suggestions) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(suggestions);
            }
        });
};

exports.suggestionByID = function (req, res, next, id) {
    Suggestion.findById(id)
        .populate('creator', 'firstName lastName fullName')
        .populate('comments', 'created title creator upVotes')
        .exec(function (err, suggestion) {
            if (err) return next(err);
            if (!suggestion) return next(new Error('Failed to load suggestion ' + id));

            req.suggestion = suggestion;
            next();
        });
};

exports.read = function (req, res) {
    res.json(req.suggestion);
};

exports.update = function (req, res) {
    var suggestion = req.suggestion;

    suggestion.title = req.body.title;
    suggestion.upVotes = req.body.upVotes;
    suggestion.comments = req.body.comments.slice();

    suggestion.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(suggestion);
        }
    });
};

exports.delete = function (req, res) {
    var suggestion = req.suggestion;

    suggestion.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(suggestion);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.suggestion.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User not authorized.'
        });
    }
    next();
};