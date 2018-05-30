import findAll from "./../../user/operations/findAll";
import { Router } from "express";
import renderAttrs from "../../util/renderAttrs";

export const allUsers = Router();

allUsers.get("/api/users", (req, res) => {
  getUsers()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
});

allUsers.get("/users", (req, res) => {
  getUsers()
    .then(users => {
      if (users.length > 0) {
        res.render("users.hbs", {
          ...renderAttrs(req),
          pageTitle: "Users Page",
          users
        });
      } else {
        res.render("users.hbs", {
          ...renderAttrs(req),
          pageTitle: "Users Page",
          message: "No users in database"
        });
      }
    })
    .catch(error => res.status(400).send(error));
});

export function getUsers() {
  return findAll();
}
