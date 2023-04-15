const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId, // ObjectId로 변경
        required: true,
        unique: true,
        default: () => mongoose.Types.ObjectId() // default 값으로 ObjectId 생성
    },
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    title: {
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
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
});

module.exports = Post = mongoose.model('posts', PostSchema);