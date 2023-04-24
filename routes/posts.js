// routes/posts.js
const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post");
const authMiddleware = require("../middlewares/auth-middleware");

// 전체 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  const posts = await postSchema.find({}).sort("-createdAt");
  const formattedPosts = posts.map((post) => {
    const { postId, userId, nickname, title, createdAt, updatedAt } = post;
    return { postId, userId, nickname, title, createdAt, updatedAt };
  });

  try {
    res.json({ posts: formattedPosts });
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

    const post = new postSchema({  // Post 객체 생성
      userId,
      nickname,
      title,
      content,
      createdAt,
      updatedAt
    });

    await post.save();
    res.json({ message: '게시글을 생성하였습니다.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
  }
});

// 게시글 상세 조회 API
router.get("/posts/:_postId", async (req, res) => {
  try {
    const post = await postSchema.findById(req.params._postId);
    const { postId, userId, nickname, title, content, createdAt, updatedAt } = post;

    if (!req.params._postId || !post) {
      return res.status(400).json({ message: '게시글 조회에 실패하였습니다.' });
    }

    res.json({ post: { postId, userId, nickname, title, content, createdAt, updatedAt } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
  }
});

// 게시글 수정 API
router.put("/posts/:_postId", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const posts = await postSchema.findById(req.params._postId);
    const { userId } = res.locals.user;

    if (!req.params._postId || !posts) {
      return res.status(412).json({ message: '게시글 조회에 실패하였습니다.' });
    }

    if (userId === posts.userId) {
      posts.title = title;
      posts.content = content;

      await posts.save();
      res.status(200).json({ message: '게시글 수정이 완료되었습니다.' });
    } else {
      res.status(403).json({ errorMessage: "게시글 수정 권한이 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
  }
});

// 게시글 삭제 API
router.delete("/posts/:_postId", authMiddleware, async (req, res) => {
  try {
    const post = await postSchema.findById(req.params._postId);
    const { userId } = res.locals.user;


    if (!post) {
      return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }

    if (userId === post.userId) {
      await postSchema.deleteOne({ postId: post._postId });
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