// routes/posts.js

const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post");

// 전체 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  const posts = await postSchema.find({}).sort("-createdAt");
  const formattedPosts = posts.map((post) => {
    const { postId, user, title, createdAt } = post;
    return { postId, user, title, createdAt };
  });
  res.json({ data: formattedPosts });
});
// router.get("/", async (req, res) => {
//   const posts = await postSchema.find().sort("-createdAt");
//   res.json(posts);
// });

// 게시글 작성 API
router.post("/posts", async (req, res) => {
  const { user, password, title, content, createdAt } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  }
  const post = new Post({ // Post 객체 생성
    user,
    password,
    title,
    content,
    createdAt,
  });

  try {
    await post.save();
    res.json({ message: '게시글을 생성하였습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 에러 발생' });
  }
});

// 게시글 상세 조회 API
router.get("/posts/:_postId", async (req, res) => {
  try {
    if (!req.params._postId) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const post = await postSchema.findById(req.params._postId);

    if (!post) {
      return res.status(404).json({ message: '해당 ID에 해당하는 게시물을 찾을 수 없습니다.' });
    }

    const { postId, user, title, content, createdAt } = post;
    res.json({ data: { postId, user, title, content, createdAt } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 게시글 수정 API
router.put("/posts/:_postId", async (req, res) => {
  try {
    if (!req.params._postId) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const post = await postSchema.findById(req.params._postId);
    
    if (!post) {
      return res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
    }

    if (post.password === req.body.password) {
      post.title = req.body.title;
      post.password = req.body.password;
      post.content = req.body.content;

      const result = await post.save();
      res.json(result);
    } else {
      res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 게시글 삭제 API
router.delete("/posts/:_postId", async (req, res) => {
  try {
    const post = await postSchema.findById(req.params._postId);

    if (!post) {
      return res.status(404).json({ message: '해당 ID에 해당하는 게시물을 찾을 수 없습니다.' });
    }

    if (!req.body.password || !req.body.post) {
      return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    if (post.password === req.body.password) {
      await postSchema.deleteOne({ _postId: req.body.post });
      res.json({ message: "게시글을 삭제하였습니다."});
    } else {
      res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 댓글 목록 조회
// router.get("/:id/comments", async (req, res) => {
//   const post = await postSchema.findById(req.params.id)
// });

module.exports = router;