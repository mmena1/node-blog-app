import { Router } from "express";
import getLogin from "../../user/operations/login";
import { UserInstance } from "../../user/model";
import verifyToken from "../../user/operations/verifyToken";

export const login = Router();
login.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  getLogin(email, password)
    .then(token =>
      verifyToken(token.token, "0.rfyj3n9nzh").then(valid => {
        if (valid) {
          res.render("home.hbs", {
            pageTitle: "Welcome Page",
            welcomeMessage: "Welcome message!"
          });
        } else {
          res.render("login.hbs", {
            pageTitle: "Login Page",
            messages: "Invalid credentials"
          });
        }
      })
    )
    .catch(error => {
      res.render("login.hbs", {
        pageTitle: "Login Page",
        messages: error
      });
    });
});

login.get("/login", (req, res) => {
  res.render("login.hbs", {
    pageTitle: "Login Page"
  });
});
