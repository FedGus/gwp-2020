"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Organizations, {
        onDelete: "cascade",
        foreignKey: "ownerId",
        as: "organizations",
      });
      Users.hasMany(models.Notifications, {
        foreignKey: "authorId",
        as: "notificationUser",
      });
      Users.hasMany(models.ReadNotification, {
        foreignKey: "userId",
        as: "readNotificationUser",
      });
      Users.hasMany(models.ReadNotification, {
        foreignKey: "userId",
        as: "tasksUser",
      });
      Users.hasMany(models.Points, {
        foreignKey: "userId",
        as: "points",
      });
      Users.hasMany(models.Posts, {
        foreignKey: "authorId",
        as: "posts",
      });
      Users.hasOne(models.Administrators, {
        foreignKey: "userId",
        as: "users",
      });
    }
  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      surname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      patricity: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      login: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        // TODO: вспомнить, почему binary
        // type: DataTypes.STRING.BINARY,
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
