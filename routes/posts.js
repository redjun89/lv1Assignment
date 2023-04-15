// routes/posts.js

const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post");

// 전체 게시글 목록 조회 API
router.get("/", async (req, res) => {
  const posts = await postSchema.find().sort("-createdAt");
  res.json(posts);
});

// 게시글 작성 API
router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body;
  const post = new postSchema({
    user,
    password,
    title,
    content,
  });

  if (!title || !content) {
    return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  }

  await post.save();

  res.json({ message: '게시글을 생성하였습니다.' });
});

// 게시글 조회 API
router.get("/posts", async (req, res) => {
  const post = await postSchema.findById(req.params.id);
  res.json(post);
});

// 게시글 상세 조회 API
router.get("/posts/:_postId", async (req, res) => {
    const post = await postSchema.findById(req.params.id);
    res.json(post);
  });

// 게시글 수정 API
router.put("/posts/:_postId", async (req, res) => {
  const post = await postSchema.findById(req.params.id);

  if (post.password === req.body.password) {
    post.title = req.body.title;
    post.author = req.body.author;
    post.password = req.body.password;
    post.content = req.body.content;

    const result = await post.save();
    res.json(result);
  } else {
    res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
  }
});

// 게시글 삭제 API
router.delete("/posts/:_postId", async (req, res) => {
  const post = await postSchema.findById(req.params.id);

  if (post.password === req.body.password) {
    const result = await postSchema.deleteOne({ _id: req.params.id });
    res.json(result);
  } else {
    res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
  }
});

// 댓글 목록 조회
router.get("/:id/comments", async (req, res) => {
  const post = await postSchema.findById(req.params.id)
});

module.exports = router;