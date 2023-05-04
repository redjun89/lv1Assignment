const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require("../repositories/posts.repository");

class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  findcomments = async (postId) => {
    console.log(postId);
    const findcomment = await this.commentRepository.findcomments(postId);

    return findcomment.map((comment) => {
      return {
        commentId: comment.commentId,
        nickname: comment.nickname,
        title: comment.title,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  createComment = async (
    postId,
    userId,
    nickname,
    comment,
    createdAt,
    updatedAt,
  ) => {
    const createCommentData = await this.commentRepository.createComment(
      postId,
      userId,
      nickname,
      comment,
      createdAt,
      updatedAt,
    );

    return {
      postId: createCommentData.postId,
      userId: createCommentData.userId,
      nickname: createCommentData.nickname,
      comment: createCommentData.comment,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };

  updateComment = async (userId, commentId, comment) => {
    const findComment = await this.commentRepository.findcommentById(commentId);
    if (!findComment) {
      throw new Error("댓글을 찾지 못했습니다.");
    }

    if (userId !== findComment.userId) {
      throw new Error("댓글 수정 권한이 없습니다.");
    };

    if (userId === findComment.userId) {
      await this.commentRepository.updateComment(userId, commentId, comment);

      const updateComment = await this.commentRepository.findcommentById(commentId);

      return {
        postId: updateComment.postId,
        nickname: updateComment.nickname,
        comment: updateComment.comment,
        createdAt: updateComment.createdAt,
        updatedAt: updateComment.updatedAt,
      };
    }
  };

  deleteComment = async (commentId, userId) => {
    const findComment = await this.commentRepository.findcommentById(commentId);
    if (!findComment) {
      throw new Error("댓글을 찾지 못했습니다.");
    }

    if (userId !== findComment.userId) {
      throw new Error("댓글 삭제 권한이 없습니다.");
    };

    if (userId === findComment.userId) {
      await this.commentRepository.deleteComment(commentId);

      return;
    }
  };
}

module.exports = CommentService;