const CommentService = require('../services/comments.service');
const PostService = require("../services/posts.service");

class CommentsController {
  commentService = new CommentService();
  postService = new PostService();

  getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;
      console.log(postId);
      const comment = await this.commentService.findcomments(postId);

      res.status(200).json({ data: comment });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    };
  };

  createComment = async (req, res, next) => {
    try {
      const { comment, createdAt, updatedAt } = req.body;
      const { postId } = req.params;
      const { userId, nickname } = res.locals.user;

      const createCommentData = await this.commentService.createComment(
        postId,
        userId,
        nickname,
        comment,
        createdAt,
        updatedAt,
      );

      res.status(201).json({ data: createCommentData });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    };
  };

  updateComment = async (req, res, next) => {
    try {
      const { comment } = req.body;
      const { commentId } = req.params;
      const { userId } = res.locals.user;

      const updatePost = await this.commentService.updateComment(
        userId,
        commentId,
        comment
      );

      res.status(200).json({ data: updatePost });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    };
  };

  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { userId } = res.locals.user;

      const deletePost = await this.commentService.deleteComment(commentId, userId);

      res.status(200).json({ message: '댓글이 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    };
  };
}

module.exports = CommentsController;