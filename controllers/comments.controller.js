const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();

  getCommentsById = async (req, res, next) => {
    const { postId } = req.params;
    const comment = await this.commentService.findPostById(postId);

    res.status(200).json({ data: comment });
  };

  createComment = async (req, res, next) => {
    const { nickname, password, title, content } = req.body;
    const createPostData = await this.postService.createPost(
      nickname,
      password,
      title,
      content
    );

    res.status(201).json({ data: createPostData });
  };

  updateComment = async (req, res, next) => {
    const { postId } = req.params;
    const { password, title, content } = req.body;

    const updatePost = await this.postService.updatePost(
      postId,
      password,
      title,
      content
    );

    res.status(200).json({ data: updatePost });
  };

  deleteComment = async (req, res, next) => {
    const { postId } = req.params;
    const { password } = req.body;

    const deletePost = await this.postService.deletePost(postId, password);

    res.status(200).json({ data: deletePost });
  };
}

module.exports = CommentsController;