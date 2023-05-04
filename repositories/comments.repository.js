const { comments } = require('../models');

class CommentRepository {
  findcomments = async (postId) => {
    console.log(postId);
    const Comments = await comments.findAll({
      where: { postId: postId },
      order: [["createdAt", "DESC"]],
    });

    return Comments;
  };

  findcommentById = async (commentId) => {
    const Comment = await comments.findOne({
			where: { commentId },
		});
		return Comment;
  };

  createComment = async (
    postId,
    userId,
    nickname,
    comment,
    createdAt,
    updatedAt,
  ) => {
    const createCommentData = await comments.create({
      postId,
      userId,
      nickname,
      comment,
      createdAt,
      updatedAt,
    });

    return createCommentData;
  };

  updateComment = async (userId, commentId, comment) => {
    const updateCommentData = await comments.update(
      { comment },
      { where: { commentId, userId } }
    );

    return updateCommentData;
  };

  deleteComment = async (commentId) => {
    const updatePostData = await comments.destroy({ where: { commentId } });

    return updatePostData;
  };
}

module.exports = CommentRepository;