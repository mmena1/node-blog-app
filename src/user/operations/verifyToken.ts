import { User } from "./../model";
import * as jwt from "jsonwebtoken";
import * as Promise from "bluebird";
export default function(token: string, jwtSecret: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        resolve(false);
        return;
      }

      // User.findById(decoded["id"]);
      resolve(true);
      return;
    });
  }) as Promise<boolean>;
}
