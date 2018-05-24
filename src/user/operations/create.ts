import { User, UserInstance, UserAttrs } from "../model";
import hash from "../../util/hashing";
export default function(data: UserAttrs): Promise<UserInstance> {
  return hash(data.password).then(
    hashed => {
      const user = {
        ...data,
        password: hashed
      };
      return User.create(user);
    },
    error => {
      throw new Error("User.password cannot be null");
    }
  );
}
