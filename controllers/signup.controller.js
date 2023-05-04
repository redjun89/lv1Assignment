//signupController.js
const { signUp } = require('../services/userService');

const signUpController = async (req, res) => {
  try {
    const { nickname, password, confirm } = req.body;
    const result = await signUp(nickname, password, confirm);
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

module.exports = { signUpController };
