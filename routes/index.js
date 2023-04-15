// routes/index.js

const express = require("express");
const router = express.Router();

const posts = require("./posts");
const comments = require("./comments");

router.use("/posts", posts);
router.use("/comments", comments);

module.exports = router;
