// routes/users.js

const express = require("express");
const router = express.Router();

const User = require("../schemas/signup");

// 회원가입 API
router.post("/signup", async (req, res) => {
try {
  const { nickname, password, confirm } = req.body;
  const nickPattern = new RegExp('^[a-zA-Z0-9]{3,}$');
  console.log(nickPattern.test(nickname));
  if (!nickPattern.test(nickname)) {
    res.status(412).json({
      errorMessage: "닉네임의 형식이 일치하지 않습니다."
    })
    return;
  }

  if (password !== confirm) {
    res.status(412).json({
      errorMessage: "패스워드가 일치 하지 않습니다.",
    });
    return;
  }

  if (password.length < 4) {
    response.status(412).json({
      errorMessage: "패스워드 형식이 올바르지 않습니다."
    })
    return;
  }

  const passwordPattern = new RegExp(`^[^${nickname}]{4,}$`);
  if (!passwordPattern.test(password)) {
    res.status(412).json({
      errorMessage: "패스워드에 닉네임이 포함되어 있습니다."
    })
    return;
  }

  // nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
  const existsUsers = await User.findOne({
    $or: [{ nickname }],
  });
  if (existsUsers) {
    // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않습니다.
    res.status(412).json({
      errorMessage: "중복된 닉네임입니다.",
    });
    return;
  };

  const user = new User({ nickname, password });
  await user.save();

  res.status(201).json({
    message: "회원가입에 성공하였습니다."
  });
} catch (err) {
  res.status(400).json({
    message: "요청한 데이터 형식이 올바르지 않습니다."})
}
});


module.exports = router;