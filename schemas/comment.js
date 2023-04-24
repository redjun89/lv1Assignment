const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
    // commentId: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     unique: true,
    //     ref: 'posts',
    //     default: () => new mongoose.Types.ObjectId()
    // },
    userId: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
});

// 가상의 userId 값을 할당
CommentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
});

// user 정보를 JSON으로 형변환 할 때 virtual 값이 출력되도록 설정
CommentSchema.set("toJSON", {
    virtuals: true,
});

module.exports = Comment = mongoose.model('comments', CommentSchema);