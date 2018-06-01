import { PostInstance, Post } from "./../model";
export default function(): Promise<PostInstance[]> {
  return Post.findAll();
}
