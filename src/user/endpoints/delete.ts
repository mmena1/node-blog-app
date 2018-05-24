import { User } from "./../../user/model";
import destroy from "./../../user/operations/delete";
import { Router } from "express";

export const deleteUser = Router();

deleteUser.delete("/:userId", (req, res) => {
  User.findById(req.params.userId).then(user => {
    if (!user) {
      return res.status(400).send({
        message: "User Not Found"
      });
    }
    destroy(user)
      .then(() => res.status(204).send)
      .catch(error => res.status(400).send(error));
  });
});
