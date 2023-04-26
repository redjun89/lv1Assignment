// routes/posts.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { posts } = require("../models");
const { Op } = require("sequelize");

// 전체 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  const Posts = await posts.findAll({
    attributes: ['postId', 'userId', 'nickname', 'title', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']]
  });

  try {
    res.json({ posts: Posts });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  };
});

// 게시글 작성 API
router.post("/posts", authMiddleware, async (req, res) => {
  try {
    const { title, content, createdAt, updatedAt } = req.body;
    const { userId, nickname } = res.locals.user;

    if (!title) {
      return res.status(412).json({ message: '제목을 입력해주세요.' });
    }

    if (!title || !content) {
      return res.status(412).json({ message: '내용을 입력해주세요.' });
    }

    await posts.create({
      userId,
      nickname,
      title,
      content,
      createdAt,
      updatedAt
    });

    res.json({ message: '게시글을 생성하였습니다.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
  }
});

// 게시글 상세 조회 API
router.get("/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await posts.findOne({
      attributes: ['postId', 'userId', 'nickname', 'title', 'content', 'createdAt', 'updatedAt'],
      where: { postId }
    })

    if (!req.params.postId || !postId) {
      return res.status(400).json({ message: '게시글 조회에 실패하였습니다.' });
    }

    res.json({ post: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

// 게시글 수정 API
router.put("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    const post = await posts.findOne({ where: { postId } });

    if (!post) {
      return res.status(412).json({ message: '게시글 조회에 실패하였습니다.' });
    } else if (userId !== post.userId) {
      return res.status(403).json({ errorMessage: "게시글 수정 권한이 없습니다." });
    }

    await posts.update(
      { title, content }, // title과 content 컬럼을 수정합니다.
      {
        where: {
          [Op.and]: [{ postId }, { userId: userId }],
        }
      }
    );
    return res.status(200).json({ message: '게시글 수정이 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
  }
});

// 게시글 삭제 API
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    const post = await posts.findOne({ where: { postId } });

    if (!post) {
      return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }

    if (userId === post.userId) {

      await posts.destroy({
        where: {
          [Op.and]: [{ postId }, { userId }],
        }
      });

      res.json({ message: "게시글을 삭제하였습니다." });
    } else {
      res.status(401).json({ error: "게시글 삭제 권한이 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '게시글 삭제에 실패하였습니다.' });
  }
});

module.exports = router;