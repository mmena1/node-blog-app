import { PostInstance, Post } from "./../model";
import * as Promise from "bluebird";

export default function(id: number, postAttrs: Object): Promise<PostInstance> {
  if (postAttrs.hasOwnProperty("userId")) {
    throw new Error("Cannot change userId");
  }
  return Post.findById(id).then(post => {
    if (post === null) {
      throw new Error("No post with that ID");
    }
    return post.updateAttributes(postAttrs);
  });
}
