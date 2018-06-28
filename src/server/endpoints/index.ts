import { Router } from "express";
import renderAttrs from "../../util/renderAttrs";
import findAll from "../../post/operations/findAll";
import * as Promise from "bluebird";
import { PostAttrs } from "../../post/model";
import { User, UserAttrs } from "../../user/model";

export const index = Router();

index.get("/", (req, res) => {
  getPostsWithUsers().then(postsWithUsers => {
    res.render("index.hbs", {
      ...renderAttrs(req),
      pageTitle: "Index",
      postsWithUsers
    });
  });
});

export interface PostWithUser {
  post: PostAttrs;
  user: UserAttrs;
}

export function getPostsWithUsers(): Promise<PostWithUser[]> {
  return findAll().then(posts => {
    return Promise.all(
      posts.map(post =>
        User.findOne({ where: { id: post.userId } }).then(user => {
          return { post, user };
        })
      )
    ).then((postsWithUsers: PostWithUser[]) => postsWithUsers);
  });
  // return Promise.resolve([]);
}
