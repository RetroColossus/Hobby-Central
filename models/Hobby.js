const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hobby extends Model {}

Hobby.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      your_hobby: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isURL: true
      }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'hobby'
    }
  );

  module.exports = Hobby;
