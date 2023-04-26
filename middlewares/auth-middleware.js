// middlewares/auth-middleware.js

const jwt = require("jsonwebtoken");
const { users } = require("../models");

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  const [authType, authToken] = Authorization.split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(403).send({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }

  try {
    const decodedToken = jwt.verify(authToken, "customized-secret-key");
    const userId = decodedToken.userId;
    console.log(userId);

    const user = await users.findOne({ where: { userId } });
    if (!user) {
      return res.status(401).json({ "message": "토큰에 해당하는 사용자가 존재하지 않습니다." })
    }

    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).send({
      errorMessage: "쿠키에서 오류가 발생했습니다.",
    });
  }
};