'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      commentId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Users 모델을 참조합니다.
          key: 'userId', // Users 모델의 userId를 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Users 모델의 userId가 삭제되면, Comments 모델의 데이터가 삭제됩니다.
      },
      postId: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
        references: {
          model: 'posts', // Posts 모델을 참조합니다.
          key: 'postId', // Posts 모델의 postId를 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Posts 모델의 postId가 삭제되면, Comments 모델의 데이터가 삭제됩니다.
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'nickname', 
        },
        onDelete: 'CASCADE'
      },
      comment: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};