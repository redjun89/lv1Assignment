const { users } = require('../models');

class SignupRepository {
  async createUser(data) {
    return users.create(data);
  }

  async findUserByNickname(nickname) {
    return users.findOne({
      where: { nickname: nickname },
    });
  }
}

module.exports = SignupRepository;
