const mongoose = require('mongoose');

const connect = () => {
  mongoose
  .connect("mongodb://127.0.0.1:27017/crud_assignment")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

const Post = require('./post');
const Comment = require('./comment');

module.exports = {
  Post,
  Comment,
  connect
};