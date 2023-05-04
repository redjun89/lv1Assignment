// routes/posts.js
const express = require("express");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const authMiddleware = require("../middlewares/auth-middleware");

router.get('/', authMiddleware, postsController.getPosts); // 게시물 전체 조회
router.get('/:postId', authMiddleware, postsController.getPostById); // 게시물 상세조회
router.post('/', authMiddleware, postsController.createPost); // 게시물 작성
router.put('/:postId', authMiddleware, postsController.updatePost); // 게시물 수정
router.delete('/:postId', authMiddleware, postsController.deletePost); // 게시물 삭제

module.exports = router;