const express = require('express');
const router = express.Router({ mergeParams: true });

const commentSchema = require('../schemas/comment');

// 댓글 목록 조회 API
router.get('/posts/:_postId/comments', async (req, res) => {
    const comments = await commentSchema.find().sort("-createdAt");

    if (!comments || !req.params) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const formattedComments = comments.map((comment) => {
      const { commentId, user, content, createdAt } = comment;
      return { commentId, user, content, createdAt };
    });
    res.json({ data: formattedComments});
});

// 댓글 작성 API
router.post('/posts/:_postId/comments', async (req, res) => {
  try {
    const { user, content, password } = req.body;
    if (!content) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
    }
    if (!req.params) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    const newComment = new commentSchema({
      postId: req.params._postId,
      user,
      content,
      password,
    });
    const comment = await newComment.save();
    res.json({message: "댓글을 생성하였습니다."});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 댓글 수정 API
router.put('/posts/:_postId/comments/:_commentId', async (req, res) => {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요' });
    }
    const comment = await commentSchema.findById(req.params._commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }
    if (!req.body || !req.params) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    comment.content = content;
    await comment.save();
    res.json({message: '댓글을 수정하였습니다.'});
});

// 댓글 삭제 API
router.delete('/posts/:_postId/comments/:_commentId', async (req, res) => {
    const comment = await commentSchema.findById(req.params._commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }
    if (!req.body || !req.params) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    if (comment._commentId === req.body._commentId) {
      await commentSchema.deleteOne({ commentId: comment.commentId });
      res.json({ message: '댓글을 삭제하였습니다.' });
    }
});

module.exports = router;