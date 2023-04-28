// routes/index.js

const express = require("express");
const router = express.Router();

const signup = require("./signup");
const login = require("./login");
const posts = require("./posts");
const comments = require("./comments");
const likes = require("./likes");


router.use("/", [signup, login, posts, comments, likes]);

module.exports = router;