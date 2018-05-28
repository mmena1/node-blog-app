import findAll from "./../../user/operations/findAll";
import { Router } from "express";

export const allUsers = Router();

allUsers.get("/", (req, res) => {
  getUsers()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
});

export function getUsers() {
  return findAll();
}
