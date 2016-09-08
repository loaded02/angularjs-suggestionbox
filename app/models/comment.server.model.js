/**
 * Created by moritz on 08.09.16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank.'
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    upvotes: {
        type: Number,
        default: 0
    }
});

mongoose.model('Comment', CommentSchema);