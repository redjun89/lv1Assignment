const LikeRepository = require('../repositories/likes.repository');
const PostRepository = require("../repositories/posts.repository");

class LikeService {
  likeRepository = new LikeRepository();
  postRepository = new PostRepository();

  updateLike = async (postId, userId) => {
    let likely = await this.likeRepository.findOneLike(postId, userId);

    if (!likely) {
      await this.likeRepository.createLike(postId, userId);

      return '게시글에 좋아요를 등록하였습니다.'
    } else {
      await this.likeRepository.destroyLike(postId, userId);

      return '게시글에 좋아요를 취소하였습니다.'
    };
  };

  getLikedPosts = async (userId) => {
    const parseLikePostsModel = (likes) => {
      return likes.map((like) => {
        let obj = {};

        for (const [k, v] of Object.entries(like)) {
          if (k.split('.').length > 1) {
            const key = k.split('.')[1];
            obj[key] = v;
          } else obj[k] = v;
        }
        return obj;
      })
    }

    const Posts = await this.likeRepository.findAllLikes(userId)
      .then((likes) => parseLikePostsModel(likes));
    return Posts;

  };
}

module.exports = LikeService;