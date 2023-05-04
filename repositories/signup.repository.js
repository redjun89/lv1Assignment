//userRepository.js
const { users } = require('../models');

class UserRepository {
  async createUser(data) {
    return users.create(data);
  }

  async findUserByNickname(nickname) {
    return users.findOne({
      where: { nickname: nickname },
    });
  }
}

module.exports = UserRepository;
