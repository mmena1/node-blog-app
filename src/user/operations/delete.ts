import { UserInstance } from "./../model";

export default function(user: UserInstance) {
  return user.destroy();
}
