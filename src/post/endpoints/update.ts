import { Router } from "express";
import * as Promise from "bluebird";
import { Post } from "../model";
import update from "../operations/update";

export const updatePost = Router();

updatePost.get("/post/update", (req, res) => {

  if (req.query.post_id) {
    Post.findOne({
      where: { id: req.query.post_id }
    }).then(post => {
      res.render("post.hbs", {
        pageTitle: "Update post",
        title: post.title,
        content: post.content
      });
    });
  } else {
    res.render("post.hbs", {
      pageTitle: "Create new post"
    });
  }
});

updatePost.post("/post/update", (req, res) => {

  if (req.query.post_id) {
    update(req.query.post_id, {
      title: req.body.title,
      content: req.body.content
    }).then(_ => {
      res.redirect("/home");
    });
  } else {
    res.render("post.hbs", {
      pageTitle: "Create new post"
    });
  }
});
