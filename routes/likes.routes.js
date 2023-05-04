const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
// const { likes, posts, sequelize, users } = require("../models");
// const { Op } = require("sequelize");

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.put('/:postId', authMiddleware, likesController.updateLike); // 좋아요 업데이트
router.get('/post', authMiddleware, likesController.getLike); // 좋아요 게시글 조회

module.exports = router;