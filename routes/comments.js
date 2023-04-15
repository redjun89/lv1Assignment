const express = require('express');
const router = express.Router({ mergeParams: true });
const commentSchema = require('../schemas/comment');

// 댓글 목록 조회 API
router.get('/', async (req, res) => {
  try {
    const comments = await commentSchema.find({ postId: req.params.postId })
      .sort({ createdAt: -1 })
      .select('-password');
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 댓글 작성 API
router.post('/', async (req, res) => {
  try {
    const { content, password } = req.body;
    if (!content) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요' });
    }
    const newComment = new commentSchema({
      postId: req.params.postId,
      content,
      password,
    });
    const comment = await newComment.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 댓글 수정 API
router.put('/:commentId', async (req, res) => {
  try {
    const { content, password } = req.body;
    if (!content) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요' });
    }
    const comment = await commentSchema.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다' });
    }
    if (password !== comment.password) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' });
    }
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 댓글 삭제 API
router.delete('/:commentId', async (req, res) => {
  try {
    const comment = await commentSchema.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다' });
    }
    if (req.body.password !== comment.password) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' });
    }
    await comment.remove();
    res.json({ message: '댓글이 삭제되었습니다' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;