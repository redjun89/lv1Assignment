// routes/index.js

const express = require("express");
const router = express.Router();

const posts = require("./posts.js");
const comments = require("./comments.js");
// const connect = require("./schemas");
// connect();

router.use("/", [posts, comments]);
// router.use("/comments", comments);

module.exports = router;
