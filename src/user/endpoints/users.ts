import * as Promise from "bluebird";
import * as R from "ramda";
import createFollowedUser from "../../followedUsers/operations/create";
import findAll from "./../../user/operations/findAll";
import findAllFollowed from "./../../followedUsers/operations/findAll";
import { Router } from "express";
import renderAttrs from "../../util/renderAttrs";
import { User } from "../model";
import _delete from "../operations/delete";
import unfollowUser from "../../followedUsers/operations/unfollowUser";

export const allUsers = Router();

allUsers.get("/api/users", (req, res) => {
  getUsers(req.session.user.id)
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
});

allUsers.get("/users", (req, res) => {
  getUsers(req.session.user.id)
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

allUsers.post("/users", (req, res) => {
  User.findOne({ where: { id: req.body.user_id } }).then(user => {
    _delete(user).then(() => {
      // TODO add a message for successfull delete
      res.redirect("/users");
    });
  });
});

allUsers.post("/users/follow", (req, res) => {
  User.findOne({ where: { id: req.body.user_id } }).then(user => {
    createFollowedUser({
      followerUserId: req.session.user.id,
      followingUserId: user.id
    }).then(() => {
      res.redirect("/users");
    });
  });
});

allUsers.post("/users/unfollow", (req, res) => {
  console.log("user!!!!!", req.body);
  User.findOne({ where: { id: req.body.user_id } }).then(user => {
    unfollowUser({
      followerUserId: req.session.user.id,
      followingUserId: user.id
    }).then(() => {
      res.redirect("/users");
    });
  });
});

export function getUsers(userId: number) {
  return Promise.join(findAll(), findAllFollowed(userId), (users, followedUsers) => {
    const followedUsersIds = followedUsers.map(user => user.followingUserId);
    return users.map(user => {
      return {
        user,
        following: R.contains(user.id, followedUsersIds) || userId === user.id,
        ownUser: user.id === userId
      }
    })
  });
}
