import { Post, User } from "../../models/models";
export default function(data: Post.PostAttrs): Promise<Post.PostInstance> {
  return Post.Post.create(data);
}
