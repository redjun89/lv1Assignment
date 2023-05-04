const { users } = require("../models");

class LoginRepository {
  findByNickname = async (nickname) => {
    const user = await users.findOne({ where: { nickname } });
    return user;
  };
};

module.exports = LoginRepository;
