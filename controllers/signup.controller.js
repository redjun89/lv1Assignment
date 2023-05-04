const SignupService = require('../services/signup.service');

class SignupController {
  signupService = new SignupService();

  postSignup = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;
      const result = await signup(nickname, password, confirm);
      res.status(201).json({ message: result });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = SignupController;
