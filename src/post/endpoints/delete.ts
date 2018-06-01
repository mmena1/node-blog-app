import { Post } from "../model";
import destroy from "../operations/delete";
import { Router } from "express";

export const deletePost = Router();

deletePost.delete("/:userId/posts/:postId", (req, res) => {
  removePost(req.params.postId)
    .then(() => res.status(204).send)
    .catch(error => res.status(400).send(error));
});

export function removePost(postId: number) {
  return Post.findById(postId).then(post => {
    if (!post) {
      throw new Error("Post Not Found");
    }
    return destroy(post);
  });
}
