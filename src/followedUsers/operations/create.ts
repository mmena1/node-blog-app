import { FollowedUser } from "../../models/models";
export default function(data: FollowedUser.FollowedUserAttrs): Promise<FollowedUser.FollowedUserInstance> {
  return FollowedUser.FollowedUser.create(data);
}