const LoginRepository = require('../repositories/login.repository');
const jwt = require("jsonwebtoken");

class LoginService {
   loginRepository = new LoginRepository

   login = async (req, res) => {
    try {
      const { nickname, password } = req.body;
      const user = await usersService.findByNickname(nickname);
  
      if (!user || password !== user.password) {
        res.status(412).json({
          errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
        });
        return;
      }
  
      const token = jwt.sign(
        { userId: user.userId }, // token의 payload에 저장
        "customized-secret-key",
        { expiresIn: "1h" } // 토큰 만료 시간 1시간 설정
      );
  
      res.cookie("Authorization", `Bearer ${token}`);
      res.status(200).json({ message: "로그인에 성공했습니다." });
    } catch (err) {
      res.status(400).json({
        errorMessage: "로그인에 실패했습니다.",
      });
    }
  };
}

module.exports = LoginService;
