import * as Promise from "bluebird";
import { Router } from "express";
import renderAttrs from "../../util/renderAttrs";
import findAllPosts from "../../post/operations/findAllByUser";
import _delete from "../../post/operations/delete";
import { Post } from "../../post/model";
import findAllFollowedUsers from "../../followedUsers/operations/findAll";
import findAllByFollowedUsers from "../../post/operations/findAllByFollowedUsers";

export const home = Router();
home.get("/api", (req, res) => {
  // console.log(req.headers);
  res.status(200).send({
    message: "Welcome to the Blog App!"
  });
});

home.get("/home", (req, res) => {
  const id = req.session.user.id;
  return Promise.join(
    findAllPosts(id),
    findAllFollowedUsers(id),
    (ownPosts, followedUsers) => {
      return findAllByFollowedUsers(followedUsers).then(followedPosts => {
        return { ownPosts, followedPosts };
      });
    }
  ).then(posts => {
    const values = {
      ...renderAttrs(req),
      pageTitle: `Welcome ${req.session.user.username}!`,
      welcomeMessage: "This is your home page"
    };
    if (posts.ownPosts.length > 0) {
      res.render("home.hbs", {
        ...values,
        posts: posts.ownPosts,
        followedPosts: posts.followedPosts
      });
    } else {
      res.render("home.hbs", {
        ...values,
        message: "I don't have posts yet :(",
        followedPosts: posts.followedPosts
      });
    }
  });
});

home.post("/home", (req, res) => {
  Post.findOne({ where: { id: req.body.post_id } }).then(post => {
    _delete(post).then(() => {
      // TODO add a message for successfull delete
      res.redirect("/home");
    });
  });
});

home.get("/newPost", (_req, res) => {
  res.render("post.hbs", {
    pageTitle: "Create new post"
  });
});
