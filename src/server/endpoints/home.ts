import { Router } from "express";
import renderAttrs from "../../util/renderAttrs";
import findAllPosts from "../../post/operations/findAllByUser";
import _delete from "../../post/operations/delete";
import { Post } from "../../post/model";

export const home = Router();
home.get("/api", (req, res) => {
  // console.log(req.headers);
  res.status(200).send({
    message: "Welcome to the Blog App!"
  });
});

home.get("/home", (req, res) => {
  findAllPosts(req.session.user.id).then(posts => {
    const values = {
      ...renderAttrs(req),
      pageTitle: `Welcome ${req.session.user.username}!`,
      welcomeMessage: "This is your home page"
    };
    if (posts.length > 0) {
      res.render("home.hbs", {
        ...values,
        posts
      });
    } else {
      res.render("home.hbs", {
        ...values,
        message: "I don't have posts yet :("
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
