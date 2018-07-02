import * as Sequelize from "sequelize";
import { sequelize } from "../models/sequelize";
import { UserInstance, User } from "../user/model";

export interface PostInstance
  extends Sequelize.Instance<PostAttrs>,
    PostAttrs {}

export interface PostModel extends Sequelize.Model<PostInstance, PostAttrs> {}

export interface PostAttrs {
  id?: number;
  title: string;
  content: string;
  userId: number;
  createdAt?: Date;
}

export interface PostsAndUser {
  post: PostAttrs,
  username: string
}

export const Post = sequelize.define<PostInstance, PostAttrs>("Post", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
  // user: {
  //   type: Sequelize.INTEGER,
  //   onDelete: "CASCADE",
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: "id",
  //     as: "userId"
  //   }
  // }
});
