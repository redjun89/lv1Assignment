const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  // 전체 게시물 조회
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  // 게시물 상세 조회
  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };

  // 게시물 작성
  createPost = async (req, res, next) => {
    const { title, content, createdAt, updatedAt } = req.body;
    const { userId, nickname } = res.locals.user;
    const createPostData = await this.postService.createPost(
      userId,
      nickname,
      title,
      content,
      createdAt,
      updatedAt
    );

    res.status(201).json({ data: createPostData });
  };

  // 게시물 수정
  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const { userId } = res.locals.user;

      const updatePost = await this.postService.updatePost(
        postId,
        userId,
        title,
        content
      );

      res.status(200).json({ data: updatePost });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: error.message });
    };
  };

  // 게시물 삭제
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

      await this.postService.deletePost(postId, userId);

      res.status(200).json({ message: '게시물을 삭제하였습니다.' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: error.message });
    };
  };
}

module.exports = PostsController;