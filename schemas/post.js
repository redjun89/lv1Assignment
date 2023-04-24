const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    // postId: {
    //     type: Schema.Types.ObjectId, // ObjectId로 변경
    //     required: true,
    //     unique: true,
    //     default: () => new mongoose.Types.ObjectId() // default 값으로 ObjectId 생성
    // },
    nickname: {
        type: String,
        required: true,
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
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // comments: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'comments'
    //     }
    // ]
});

// 가상의 userId 값을 할당
PostSchema.virtual("postId").get(function () {
    return this._id.toHexString();
});

// user 정보를 JSON으로 형변환 할 때 virtual 값이 출력되도록 설정
PostSchema.set("toJSON", {
    virtuals: true,
});

module.exports = Post = mongoose.model('posts', PostSchema);