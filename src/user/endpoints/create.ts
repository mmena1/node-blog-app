import { User, UserAttrs } from "./../../user/model";
import create from "./../../user/operations/create";
import { Router } from "express";

export const createUser = Router();

createUser.post("/", (req, res) => {
  const user: UserAttrs = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };
  create(user)
    .then(newUser => res.status(201).send(newUser))
    .catch(error => res.status(400).send(error));
});
