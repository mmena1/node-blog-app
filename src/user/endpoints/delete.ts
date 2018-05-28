import { User } from "./../../user/model";
import destroy from "./../../user/operations/delete";
import { Router } from "express";

export const deleteUser = Router();

deleteUser.delete("/:userId", (req, res) => {
  removeUser(req.params.userId)
    .then(() => res.status(204).send)
    .catch(error => res.status(400).send(error));
});

export function removeUser(userId: number) {
  return User.findById(userId).then(user => {
    if (!user) {
      throw new Error("User Not Found");
    }
    return destroy(user);
  });
}
