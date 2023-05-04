const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth-middleware");
// const { comments } = require("../models");
// const { Op } = require("sequelize");

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get("/comments", authMiddleware, commentsController.getCommentsById); // 댓글 조회
router.post("/comments", authMiddleware, commentsController.createComments); // 댓글 작성
router.put("/comments/:commentId", authMiddleware, commentsController.updateComments); // 댓글 수정
router.delete("/comments/:commentId", authMiddleware, commentsController.deleteComments); //댓글 삭제

module.exports = router;