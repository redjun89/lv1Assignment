//routes.js
const express = require('express');
const { signUpController } = require('../controllers/signupController');

const router = express.Router();

router.post('/signup', signUpController);

module.exports = router;