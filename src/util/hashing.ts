import * as bcrypt from "bcryptjs";

export default function(password: string) {
  return bcrypt.genSalt(10).then(salt => {
    return bcrypt.hash(password, salt).then(hash => hash);
  });
}
