import findAll from "../operations/findAll";
import { Router } from "express";
import renderAttrs from "../../util/renderAttrs";
import findAllByUser from "../operations/findAllByUser";

export const allUserPosts = Router();

allUserPosts.get("/api/users/:userId/posts", (req, res) => {
  getPosts(req.params.userId)
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
});

allUserPosts.get("/users/:userId/posts", (req, res) => {
  getPosts(req.params.userId)
    .then(posts => {
      if (posts.length > 0) {
        res.render("postsbyUser.hbs", {
          ...renderAttrs(req),
          pageTitle: "My Posts",
          posts
        });
      } else {
        res.render("postsbyUser.hbs", {
          ...renderAttrs(req),
          pageTitle: "My Posts",
          message: "I dont have posts :("
        });
      }
    })
    .catch(error => res.status(400).send(error));
});

export function getPosts(userId: number) {
  return findAllByUser(userId);
}
