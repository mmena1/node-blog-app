import { UserInstance, UserAttrs, User } from "./../model";
import * as Promise from "bluebird";

export default function(id: number, userAttrs: Object): Promise<UserInstance> {
  return User.findById(id).then(user => {
    if (user === null) {
      throw new Error("No user with that ID");
    }
    return user.updateAttributes(userAttrs);
  });
}
