// middlewares/auth-middleware.js

const jwt = require("jsonwebtoken");
const { users } = require("../models");

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  try {
    // const { Authorization } = req.cookies;
    // const [authType, authToken] = Authorization.split(" ");

        // if (!authToken || authType !== "Bearer") {
    //   res.status(403).send({
    //     errorMessage: "로그인이 필요한 기능입니다.",
    //   });
    //   return;
    // }

    // const decodedToken = jwt.verify(authToken, "customized-secret-key");
    // const userId = decodedToken.userId;

    // const user = await users.findOne({ where: { userId } });
    // if (!user) {
    //   return res.status(401).json({ "message": "토큰에 해당하는 사용자가 존재하지 않습니다." })
    // }
    const cookies = req.cookies['Authorization']

    if(!cookies) {
      return res.status(403).send({
        errorMessage: "로그인이 필요한 기능입니다."
      });
    }

    const [tokenType, tokenValue] = cookies.split(' ');
    if (tokenType !== 'Bearer') {
      res.clearCookie('Authorization'); // 인증에 실패하였을 경우 Cookie를 삭제합니다.
      return res.status(403).send({
        errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.',
      });
    }

    const { userId } = jwt.verify(tokenValue, 'customized-secret-key');
    const user = await users.findByPk(userId);

    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).send({
      errorMessage: "쿠키에서 오류가 발생했습니다.",
    });
  }
};