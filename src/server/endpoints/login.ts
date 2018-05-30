import { Router, Request } from "express";
import getLogin from "../../user/operations/login";
import { UserInstance } from "../../user/model";
import verifyToken from "../../user/operations/verifyToken";

import renderAttrs from "../../util/renderAttrs";

export const login = Router();
login.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  getLogin(email, password)
    .then(userAccount =>
      verifyToken(userAccount.token, "0.rfyj3n9nzh").then(valid => {
        if (valid) {
          req.session.token = userAccount.token;
          req.session.user = userAccount.user.username;
          if (req.query.source) {
            res.redirect(req.query.source);
          } else {
            res.render("home.hbs", {
              ...renderAttrs(req),
              pageTitle: "Welcome Page",
              welcomeMessage: "Welcome message!"
            });
          }
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
