import * as Sequelize from "sequelize";
import { sequelize } from "../models/sequelize";
//import { Post } from "../post/model";

export interface FollowedUserInstance
  extends Sequelize.Instance<FollowedUserAttrs>,
    FollowedUserAttrs {}

export interface FollowedUserModel extends Sequelize.Model<FollowedUserInstance, FollowedUserAttrs> {}

export interface FollowedUserAttrs {
  id?: number;
  followingUserId?: number;
  followerUserId?: number;
}

export const FollowedUser = sequelize.define<FollowedUserInstance, FollowedUserAttrs>("FollowedUser", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  followingUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  followerUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
//User.hasMany(Post, {
//  foreignKey: "userId",
//  as: "userPosts"
//});
