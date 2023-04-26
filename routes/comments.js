const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth-middleware");
const { comments } = require("../models");
const { Op } = require("sequelize");

// 댓글 목록 조회 API
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const Comments = await comments.findAll({
      attributes: ['commentId', 'userId', 'nickname', 'comment', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']]
    });

    res.json({ conmments: Comments });
  } catch (err) {
    res.status(400).json({ errorMessage: '서버 에러' });
  }
});

// 댓글 작성 API
router.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const { comment, createdAt, updatedAt } = req.body;
    const { postId } = req.params;
    const { userId, nickname } = res.locals.user;

    if (!comment) {
      return res.status(401).json({ message: '댓글 내용을 입력해주세요.' });
    }

    if (!req.params) {
      return res.status(402).json({ message: '게시물 조회에 실패하였습니다.' });
    }
    await comments.create({
      userId: userId,
      postId: postId,
      nickname: nickname,
      comment,
      createdAt,
      updatedAt
    });

    res.json({ message: "댓글을 생성하였습니다." });
  } catch (err) {
    res.status(400).json({ errorMessage: '서버 에러' });
  }
});

// 댓글 수정 API
router.put('/posts/:postId/comments/:commentId', authMiddleware, async (req, res) => {
  try {
    const { comment } = req.body;
    const { commentId } = req.params;
    const { userId } = res.locals.user;

    const Comment = await comments.findOne({ where: { commentId } });

    if (!comment) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요' });
    }

    if (!Comment) {
      return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    } else if (userId !== comments.userId) {
      return res.status(403).json({ errorMessage: "댓글 수정 권한이 없습니다." });
    }


    await comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ commentId }, { userId }],
        }
      }
    );

    return res.json({ message: '댓글을 수정하였습니다.' });
  } catch (err) {
    res.status(400).json({ errorMessage: '서버 에러' });
  }
});

// 댓글 삭제 API
router.delete('/posts/:postId/comments/:commentId', authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = res.locals.user;

    const Comment = await comments.findOne({ where: { commentId } });

    if (!Comment) {
      return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }

    if (userId === Comment.userId) {

      await comments.destroy({
        where: {
          [Op.and]: [{ commentId }, { userId }],
        }
      });

      res.json({ message: '댓글을 삭제하였습니다.' });
    } else {
      res.status(401).json({ error: "댓글 삭제 권한이 없습니다." });
    }
  } catch (err) {
    res.status(400).json({ errorMessage: '서버 에러' });
  }
});

module.exports = router;