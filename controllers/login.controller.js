const LoginService = require('../services/login.service');
require("dotenv").config();

class LoginController {
    loginService = new LoginService();

    postLogin = async (req, res, next) => {
        try {
            const { nickname, password } = req.body;
			const { accessToken, refreshToken } = await this.loginService.login(
				nickname,
				password
			);

            console.log(accessToken);
            console.log(refreshToken);

			res.cookie("accessToken", `Bearer ${accessToken}`);
			res.cookie("refreshToken", `Bearer ${refreshToken}`);
            res.status(201).json({ message: "로그인에 성공했습니다." });
        } catch (error) {
            console.log(error);
            res.status(400).json({ errorMessage: error.message });
        };
    };


};

module.exports = LoginController;