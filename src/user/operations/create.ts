import { User, UserInstance, UserAttrs } from "./../model";
export default function(data: UserAttrs): Promise<UserInstance> {
  return User.create(data);
}
