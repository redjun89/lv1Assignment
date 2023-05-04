const LoginService = require('../services/login.service');

class LoginController {
    loginService = new LoginService();

    postLogin = async (req, res, next) => {
        try {
            const { nickname, password } = req.body;
            const result = await this.loginService.login(nickname, password);

            res.cookie("Authorization", `Bearer ${result}`);
            res.status(201).json({ message: "로그인에 성공했습니다." });
        } catch (error) {
            console.log(error);
            res.status(400).json({ errorMessage: error.message });
        };
    };


};

module.exports = LoginController;