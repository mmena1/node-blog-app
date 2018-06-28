import { PostInstance, Post } from "./../model";
import * as Promise from "bluebird";
export default function(): Promise<PostInstance[]> {
  return Post.findAll();
}
