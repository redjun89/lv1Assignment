const SignupService = require('../services/signup.service');

class SignupController {
  signupService = new SignupService();

  postSignup = async (req, res, next) => {
    try {
      console.log(req.body);
      const { nickname, password, confirm } = req.body;
      const result = await this.signupService.signup(nickname, password, confirm);

      res.status(201).json({ message: result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = SignupController;
