const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { likes, posts, sequelize, users } = require("../models");
const { Op } = require("sequelize");

// 좋아요 업데이트
router.put("/posts/:postId/like", authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = res.locals.user;

        // const isExistPost = await posts.findByPK(postId);  // posts모델에서 Primary Key를 이용하여 검색 

        // if (!isExistPost) {
        //     return res.status(404).json({
        //         errorMessage: '게시글이 존재하지 않습니다.',
        //     });
        // }

        let likely = await likes.findOne({
            where: {
                postId: postId,
                userId: userId
            },
        })

        if (!likely) {
            await likes.create({ postId: postId, userId: userId });

            return res
                .status(200)
                .json({ message: '게시글의 좋아요를 등록하였습니다.' });
        } else {
            await likes.destroy({
                where: { postId: postId, userId: userId },
            });

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
});

// 좋아요 게시글 조회
router.get('/posts/post/like', authMiddleware, async (req, res) => {
    try {
        const { userId } = res.locals.user;

        // Like와 Post모델을 Join한 결과를 Plat Object로 변환하는 함수
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
        // .then((likes) => parseLikePostsModel(likes));

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
});

module.exports = router;