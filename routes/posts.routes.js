// routes/posts.js
const express = require("express");
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts); // 게시물 전체 조회
router.get('/:postId', postsController.getPostById); // 게시물 상세조회
router.post('/', postsController.createPost); // 게시물 작성
router.put('/:postId', postsController.updatePost); // 게시물 수정
router.delete('/:postId', postsController.deletePost); // 게시물 삭제

module.exports = router;