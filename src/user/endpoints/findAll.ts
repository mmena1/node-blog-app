import { User, UserAttrs } from "./../../user/model";
import findAll from "./../../user/operations/findAll";
import { Router } from "express";

export const allUsers = Router();

allUsers.get("/", (req, res) => {
  findAll().then(
    users => {
      res.send(users);
    },
    e => {
      res.status(400).send(e);
    }
  );
});
