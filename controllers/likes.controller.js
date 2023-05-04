const LikeService = require('../services/likes.service');

class LikesController {
    likeService = new LikeService();

    updateLike = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;

            const isExistPost = await posts.findByPk(postId);

            if (!isExistPost) {
                return res.status(404).json({
                    errorMessage: '게시글이 존재하지 않습니다.',
                });
            }

            const result = await likeService.updateLikes(postId, userId);

            if (result.liked) {
                return res
                    .status(200)
                    .json({ message: '게시글의 좋아요를 등록하였습니다.' });
            } else {
                return res
                    .status(200)
                    .json({ message: '게시글의 좋아요를 취소하였습니다.' });
            }
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
            const Posts = await likeService.getLikedPosts(userId);
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