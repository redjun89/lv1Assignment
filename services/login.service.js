const LoginRepository = require('../repositories/login.repository');
const jwt = require("jsonwebtoken");

class LoginService {
  loginRepository = new LoginRepository

  login = async (nickname, password) => {
    const user = await this.loginRepository.findByNickname(nickname);
    console.log(user);

    if (!user || password !== user.password) {
      throw new Error("닉네임 또는 패스워드를 확인해주세요.")
    };

    try {
      const token = jwt.sign(
        { userId: user.userId },
        "customized-secret-key",
        { expiresIn: "1h" }
      );
      console.log(token);
      return token;
    } catch (err) {
      throw new Error("토큰 생성에 실패했습니다.");
    }
  };
};

module.exports = LoginService;
