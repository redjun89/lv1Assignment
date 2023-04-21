// routes/index.js

const express = require("express");
const router = express.Router();

const posts = require("./posts");
const comments = require("./comments");
const users = require("./users");


router.use("/", [posts, comments, users]);

module.exports = router;