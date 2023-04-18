const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
    commentId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'posts',
        default: () => new mongoose.Types.ObjectId()
    },
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Comment = mongoose.model('comments', CommentSchema);