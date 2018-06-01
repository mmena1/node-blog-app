// Import all the models to define relations between them
import * as User from "../user/model";
import * as Post from "../post/model";

User.User.hasMany(Post.Post);
Post.Post.belongsTo(User.User);
// console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

export { User, Post };

// import { User } from "models"
// User.User
// User.UserAttr
// User.User
