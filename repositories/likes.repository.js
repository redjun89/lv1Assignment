const { likes, posts, users, sequelize } = require('../models');
const { Op } = require("sequelize");

class LikeRepository {
    findOneLike = async (postId, userId) => {
        let likely = await likes.findOne({
            where: {
                postId: postId,
                userId: userId
            },
        });
        return likely;
    };

    createLike = async (userId, postId) => {
        const createLike = await likes.create({ postId: postId, userId: userId });
        return createLike;
    };

    destroyLike = async (userId, postId) => {
        const destroyLike = await likes.destroy({
            where: { postId: postId, userId: userId }
        });
        return destroyLike;
    };

    findAllLikes = async (userId) => {
        const Posts = await posts.findAll({
            attributes: [
                'postId',
                'title',
                'createdAt',
                'updatedAt',
                [sequelize.fn('COUNT', sequelize.col('likes.postId')), 'likes'],
            ],
            include: [
                {
                    model: users,
                    attributes: ['userId', 'nickname'],
                },
                {
                    model: likes,
                    attributes: [],
                    required: true,
                    where: {
                        [Op.and]: [{ userId: userId }],
                    },
                },
            ],
            group: ['posts.postId'],
            order: [['likes', 'DESC']],
            raw: true,
        })

        return Posts;
    };
}

module.exports = LikeRepository;