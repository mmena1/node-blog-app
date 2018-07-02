// Import all the models to define relations between them
import * as User from "../user/model";
import * as Post from "../post/model";
import * as FollowedUser from "../followedUsers/model";

User.User.hasMany(Post.Post);
Post.Post.belongsTo(User.User);
FollowedUser.FollowedUser.belongsTo(User.User, {
  foreignKey: "followingUserId",
  as: "followingUser"
})
FollowedUser.FollowedUser.belongsTo(User.User, {
  foreignKey: "followerUserId",
  as: "followerUser"
})
// console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

export { User, Post, FollowedUser };

// import { User } from "models"
// User.User
// User.UserAttr
// User.User
