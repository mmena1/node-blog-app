import { User, UserInstance } from "./../model";
export default function(): Promise<UserInstance[]> {
  return User.findAll();
}
