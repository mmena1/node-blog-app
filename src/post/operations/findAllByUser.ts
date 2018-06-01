import { PostInstance, Post } from "./../model";
export default function(userId: number): Promise<PostInstance[]> {
  return Post.findAll({
    where: {
      userId: userId
    }
  });
}
