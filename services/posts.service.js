const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);

    return {
      title: findPost.title,
      nickname: findPost.nickname,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  createPost = async (
    userId, nickname, title, content, createdAt, updatedAt
  ) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      nickname,
      title,
      content,
      createdAt,
      updatedAt
    );

    return {
      postId: createPostData.postId,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  updatePost = async (postId, userId, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);

    if (!findPost) {
      throw new Error("게시글 조회에 실패하였습니다.");
    };

    if (userId !== findPost.userId) {
      throw new Error("게시글 수정 권한이 없습니다.");
    };

    await this.postRepository.updatePost(postId, title, content);

    const updatePost = await this.postRepository.findPostById(postId);

    return {
      postId: updatePost.postId,
      nickname: updatePost.nickname,
      title: updatePost.title,
      content: updatePost.content,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
    };
  };

  deletePost = async (postId, userId) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) {
      throw new Error("게시글을 찾을 수 없습니다.");
    };

    if (userId !== findPost.userId) {
      throw new Error("게시글 삭제 권한이 없습니다.");
    }

    await this.postRepository.deletePost(postId, userId);

    return;
  };
}

module.exports = PostService;