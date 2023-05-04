const LikeService = require('../services/likes.service');

class LikesController {
  likeService = new LikeService();

  updateLike = async (req, res, next) => {

  };

  deleteLike = async (req, res, next) => {

  };
}

module.exports = LikesController;