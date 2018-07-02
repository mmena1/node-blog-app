import { FollowedUser } from "../../models/models";

export default function(data: FollowedUser.FollowedUserAttrs) {
  return FollowedUser.FollowedUser.destroy({
    where: {
      followerUserId: data.followerUserId,
      followingUserId: data.followingUserId
    }
  });
}