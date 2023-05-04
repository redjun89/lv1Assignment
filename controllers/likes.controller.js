const LikeService = require('../services/likes.service');
const PostService = require('../services/posts.service');

class LikesController {
    likeService = new LikeService();
    postService = new PostService();

    updateLike = async (req, res, next) => {
        try {
            const { postId } = req.params;
            console.log(postId);
            const { userId } = res.locals.user;
            console.log(userId);

            const post = await this.postService.findPostById(postId);
            console.log(post);
            const result = await this.likeService.updateLike(postId, userId);

            res.status(200).json({ message: result });
        } catch (err) {
            console.error(`${req.method} ${req.originalUrl} : ${err.message}`);
            return res.status(400).json({
                errorMessage: '게시글 좋아요에 실패하였습니다.',
            });
        };
    };

    getLike = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const Posts = await this.likeService.getLikedPosts(userId);
            return res.status(200).json({
                data: Posts
            });
        } catch (error) {
            console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
            console.error(error);
            return res.status(400).json({
                errorMessage: '좋아요 게시글 조회에 실패하였습니다.',
            });
        }
    };
}

module.exports = LikesController;