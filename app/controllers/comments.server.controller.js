var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment');

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
    var comment = new Comment(req.body);
    comment.creator = req.user;

    comment.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(comment);
        }
    });
};

exports.list = function (req, res) {
    Comment.find().sort('-created')
        .populate('creator', 'firstName lastName fullName')
        .exec(function (err, comments) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(comments);
            }
        });
};

exports.commentByID = function (req, res, next, id) {
    Comment.findById(id)
        .populate('creator', 'firstName lastName fullName')
        .exec(function (err, comment) {
            if (err) return next(err);
            if (!comment) return next(new Error('Failed to load comment ' + id));

            req.comment = comment;
            next();
        });
};

exports.read = function (req, res) {
    res.json(req.comment);
};

exports.update = function (req, res) {
    var comment = req.comment;

    comment.title = req.body.title;
    comment.upvotes = req.body.upVotes;

    comment.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(comment);
        }
    });
};

exports.delete = function (req, res) {
    var comment = req.comment;

    comment.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(comment);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.comment.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User not authorized.'
        });
    }
    next();
};