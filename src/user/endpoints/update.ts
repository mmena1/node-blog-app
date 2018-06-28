import * as Promise from "bluebird";
import { User } from "./../../user/model";
import update from "./../../user/operations/update";
import { Router } from "express";
import hash from "../../util/hashing";

export const updateUser = Router();

//type Callback = { status: number; message: any };

updateUser.get("/user/update", (req, res) => {

  if (req.query.user_id) {
    User.findOne({
      where: { id: req.query.user_id }
    }).then(user => {
      res.render("signup.hbs", {
        pageTitle: "Update user",
        username: user.username,
        email: user.email,
        userId: user.id
      });
    });
  } else {
    res.render("signup.hbs", {
      pageTitle: "Create new user"
    });
  }
});

updateUser.post("/user/update", (req, res) => {

  if (req.query.user_id) {
    if (req.body.password) {
      hash(req.body.password).then(hashedPassword => {
        update(req.query.user_id, {
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email
        }).then(() => {
          res.redirect("/users");
        });
      });
    } else {
      update(req.query.user_id, {
        username: req.body.username,
        email: req.body.email
      }).then(() => {
        res.redirect("/users");
      });
    }
  } else {
    res.render("signup.hbs", {
      pageTitle: "Create new user"
    });
  }
});
