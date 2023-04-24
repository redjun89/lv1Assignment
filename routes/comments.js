const express = require('express');
const router = express.Router({ mergeParams: true });

const commentSchema = require('../schemas/comment');
const authMiddleware = require("../middlewares/auth-middleware");

// 댓글 목록 조회 API
router.get('/posts/:_postId/comments', async (req, res) => {
  try {
    const comments = await commentSchema.find().sort("-createdAt");

    if (!comments || !req.params) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const formattedComments = comments.map((comments) => {
      const { commentId, userId, nickname, comment, createdAt, updatedAt } = comments;
      return { commentId, userId, nickname, comment, createdAt, updatedAt };
    });
    res.json({ conmments: formattedComments });
  } catch (err) {
    res.status(400).json({ errorMessage: '서버 에러' });
  }
});

// 댓글 작성 API
router.post('/posts/:_postId/comments', authMiddleware, async (req, res) => {
  try {
    const { comment, createdAt, updatedAt } = req.body;
    const { userId, nickname } = res.locals.user;
    if (!comment) {
      return res.status(401).json({ message: '댓글 내용을 입력해주세요.' });
    }
    if (!req.params) {
      return res.status(402).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    const newComment = new commentSchema({
      userId,
      nickname,
      comment,
      createdAt,
      updatedAt
    });
    await newComment.save();
    res.json({ message: "댓글을 생성하였습니다." });
  } catch (err) {
    res.status(400).json({ errorMessage: '서버 에러' });
  }
});

// 댓글 수정 API
router.put('/posts/:_postId/comments/:_commentId', authMiddleware, async (req, res) => {
  try {
    const { comment } = req.body;
    const comments = await commentSchema.findById(req.params._commentId);
    const { userId } = res.locals.user;

    if (!comment) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요' });
    }

    if (!comments) {
      return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }

    if (!req.body || !req.params) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    if (userId === comments.userId) {
      comments.comment = comment;

      await comments.save();
      res.json({ message: '댓글을 수정하였습니다.' });
    } else {
      res.status(403).json({ errorMessage: "댓글 수정 권한이 없습니다." });
    }
  } catch (err) {
    res.status(400).json({ errorMessage: '서버 에러' });
  }
});

// 댓글 삭제 API
router.delete('/posts/:_postId/comments/:_commentId', authMiddleware, async (req, res) => {
  try {
    const comments = await commentSchema.findById(req.params._commentId);
    const { userId } = res.locals.user;

    if (!comments) {
      return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }

    if (!req.body || !req.params) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    if (userId === comments.userId) {
      await commentSchema.deleteOne({ commentId: comments._commentId });
      res.json({ message: '댓글을 삭제하였습니다.' });
    } else {
      res.status(401).json({ error: "댓글 삭제 권한이 없습니다." });
    }
  } catch (err) {
    res.status(400).json({ errorMessage: '서버 에러' });
  }
});

module.exports = router;