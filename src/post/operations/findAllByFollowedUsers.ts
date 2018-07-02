import { Post, PostAttrs, PostsAndUser } from "./../model";
import { sequelize } from "../../models/sequelize";
import { User } from "../../user/model";
import * as Promise from "bluebird";
import { FollowedUserAttrs } from "../../followedUsers/model";

export default function(users: FollowedUserAttrs[]) {
  const userIds: number[] = users.map(followedUser => followedUser.followingUserId);
  return getAllPosts(userIds).then(posts => {
    return getPostsAndUser(posts)
  });
}

function getAllPosts(userIds: number[]) {
  return Post.findAll({
    where: {
      userId: {
        [sequelize.Op.in]: userIds
      }
    }
  });
}

function getAuthor(userId: number) {
  return User.findById(userId).then(user => user.username);
}

function getPostsAndUser(posts: PostAttrs[]) {
  const postsAndUsers: Promise<PostsAndUser>[] =  posts.map(post => {
    return getAuthor(post.userId).then(username => {
      return {post, username}
    })
  });
  return Promise.all(postsAndUsers).then((resolvedPosts: PostsAndUser[]) => resolvedPosts);
}
