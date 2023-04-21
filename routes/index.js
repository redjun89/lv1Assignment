// routes/index.js

const express = require("express");
const router = express.Router();

const posts = require("./posts");
const comments = require("./comments");
const signup = require("./signup");
const login = require("./login");


router.use("/", [posts, comments, signup, login]);

module.exports = router;