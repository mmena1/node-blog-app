import { PostInstance } from "./../model";

export default function(post: PostInstance) {
  return post.destroy();
}
