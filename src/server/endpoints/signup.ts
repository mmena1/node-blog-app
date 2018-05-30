import { Router } from "express";
import create from "../../user/operations/create";
import { UserInstance } from "../../user/model";

export const signup = Router();
signup.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  create({
    username,
    password,
    email
  })
    .then((user: UserInstance) =>
      res.status(200).send({
        message: "User created!"
      })
    )
    .catch(error => {
      res.render("signup.hbs", {
        pageTitle: "Sign Up Page",
        messages: error
      });
    });
});

signup.get("/signup", (req, res) => {
  // Show the signup form
  res.render("signup.hbs", {
    pageTitle: "Sign Up Page"
  });
});
