import create from "../operations/create";
import { Router } from "express";
import { PostAttrs, PostInstance } from "../model";

export const createPost = Router();

// "/users/:userId/posts"
createPost.post("/newPost", (req, res) => {
  const post: PostAttrs = {
    title: req.body.title,
    content: req.body.content,
    userId: req.session.user.id
  };
  postPost(post)
    .then(newPost => res.status(201).redirect("/home"))
    .catch(error => res.status(400).send(error));
});

export function postPost(post: PostAttrs): Promise<PostInstance> {
  return create(post);
}
