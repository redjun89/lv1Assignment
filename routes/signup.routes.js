//routes.js
const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

router.post('/signup', signupController.postSignup); // 회원가입

module.exports = router;