import { FollowedUserInstance, FollowedUser } from "./../model";
export default function(userId: number): Promise<FollowedUserInstance[]> {
  return FollowedUser.findAll({
    where: {
      followerUserId: userId
    }
  });
}