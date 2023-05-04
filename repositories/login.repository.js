// services/usersService.js

const { users } = require("../models");

const findByNickname = async (nickname) => {
  const user = await users.findOne({ where: { nickname } });
  return user;
};

module.exports = { findByNickname };
