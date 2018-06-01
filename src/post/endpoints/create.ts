import {} from "../model";
import create from "../operations/create";
import { Router } from "express";
import { PostAttrs, PostInstance } from "../model";

export const createPost = Router();

// "/users/:userId/posts"
createPost.post("/", (req, res) => {
  const post: PostAttrs = {
    title: req.body.title,
    content: req.body.content,
    userId: req.params.userId
  };
  postPost(post)
    .then(newPost => res.status(201).send(newPost))
    .catch(error => res.status(400).send(error));
});

export function postPost(post: PostAttrs): Promise<PostInstance> {
  return create(post);
}
