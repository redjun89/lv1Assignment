const LikeRepository = require('../repositories/likes.repository');
const { Op } = require("sequelize");

class LikeService {
  likeRepository = new LikeRepository();

  findByPk = async () => {

  };

  updateLikes = async () => {

  };

  getLikedPosts = async () => {

  };
}

module.exports = LikeService;