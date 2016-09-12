/**
 * Created by moritz on 12.09.16.
 */
var mongoose = require('mongoose'),
    CommentThread = mongoose.model('CommentThread'),
    Reply = mongoose.model('Reply');

exports.commentThreadByID = function (req, res, next, id) {
    CommentThread.findById(id)
        .exec(function (err, commentThread) {
            if (err) return next(err);
            if (!commentThread) return next(new Error('Failed to load commentThread ' + id));

            req.commentThread = commentThread;
            next();
        });
};

exports.read = function (req, res) {
    res.json(req.commentThread);
};

exports.update = function (req, res) {
    var commentThread = req.commentThread;
    var newComment = Reply(req.body.newComment);
    newComment.username = generateRandomUsername(); //replace!!
    addComment(req, res, commentThread, commentThread,
        req.body.parentCommentId, newComment);
};

function addComment(req, res, commentThread, currentComment,
                    parentId, newComment){
    if (commentThread.id == parentId){
        commentThread.replies.push(newComment);
        updateCommentThread(req, res, commentThread);
    } else {
        for(var i=0; i< currentComment.replies.length; i++){
            var c = currentComment.replies[i];
            if (c._id == parentId){
                c.replies.push(newComment);
                var replyThread = commentThread.replies.toObject();
                updateCommentThread(req, res, commentThread);
                break;
            } else {
                addComment(req, res, commentThread, c,
                    parentId, newComment);
            }
        }
    }
}

function updateCommentThread(req, res, commentThread){
    CommentThread.update({ _id: commentThread.id },
        {$set:{replies:commentThread.replies}})
        .exec(function(err, savedComment){
            if (err){
                res.json(404, {msg: 'Failed to update CommentThread.'});
            } else {
                res.json({msg: "success"});
            }
        });
}

function generateRandomUsername(){
    //typically the username would come from an authenticated session
    var users=['DaNae', 'Brad', 'Brendan', 'Caleb', 'Aedan', 'Taeg'];
    return users[Math.floor((Math.random()*5))];
}