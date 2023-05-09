const { LoginRepository, RedisClientRepository } = require('../repositories/login.repository');
const jwt = require("jsonwebtoken");

class LoginService {
  loginRepository = new LoginRepository();
  redisClientRepository = new RedisClientRepository();

  login = async (nickname, password) => {
    const user = await this.loginRepository.findByNickname(nickname);
    console.log(user);

    if (!user || password !== user.password) {
      throw new Error("닉네임 또는 패스워드를 확인해주세요.")
    };

    const userId = user.userId;
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken();
    await this.redisClientRepository.setRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };

    function createAccessToken(userId) {
      const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      return accessToken;
    }
    
    function createRefreshToken() {
      const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return refreshToken;
    }

    // try {
    //   const token = jwt.sign(
    //     { userId: user.userId },
    //     process.env.SECRET_KEY,
    //     { expiresIn: "1h" }
    //   );
    //   console.log(token);
    //   return token;
    // } catch (err) {
    //   throw new Error("토큰 생성에 실패했습니다.");
    // }
  };
};

module.exports = LoginService;
