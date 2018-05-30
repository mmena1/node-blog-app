import { User } from "./../model";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
export default function(email: string, password: string) {
  const jwtSecret = "0.rfyj3n9nzh";

  return User.findOne({ where: { email } }).then(user => {
    if (user === null) {
      throw new Error("The email provided is not registered");
    }
    return bcrypt.compare(password, user.password).then(valid => {
      if (valid) {
        const { id, email } = user;
        return { token: jwt.sign({ id, email }, jwtSecret), user };
      } else {
        throw new Error("Invalid password");
      }
    });
  });
}
