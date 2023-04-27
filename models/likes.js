'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.users, {
        targetKey: 'userId',
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.posts, {
        targetKey: 'postId',
        foreignKey: 'PostId',
        onDelete: 'CASCADE',
      });

    }
  }
  
  likes.init({
    likeId: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // Primary Key (기본키)
      type: DataTypes.INTEGER,
    },
    PostId: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    UserId: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};