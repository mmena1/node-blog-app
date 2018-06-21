import { Router, Request } from "express";
import getLogin from "../../user/operations/login";
import { UserInstance } from "../../user/model";
import verifyToken from "../../user/operations/verifyToken";

import renderAttrs from "../../util/renderAttrs";
import config from "../../util/index";

export const login = Router();
login.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  getLogin(email, password)
    .then(userAccount =>
      verifyToken(userAccount.token, config.jwt_secret).then(valid => {
        if (valid) {
          req.session.token = userAccount.token;
          req.session.user = userAccount.user;
          if (req.query.source) {
            res.redirect(req.query.source);
          } else {
            res.redirect("/home");
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
