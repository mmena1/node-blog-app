import { User, UserAttrs, UserInstance } from "./../../user/model";
import update from "./../../user/operations/update";
import { Router, Request, Response } from "express";
import * as Promise from "bluebird";
import * as R from "ramda";

export const updateUser = Router();

//type Callback = { status: number; message: any };

updateUser.patch("/:userId", (req, res) =>
  patchUser(req.params.userId, req.body)
    .then(updatedUser => res.status(200).send(updatedUser))
    .catch(error => res.status(400).send(error))
);

function validator(body: Object): Promise<Object> {
  return new Promise((resolve, reject) => {
    // R.pickAll(Object.keys(body), UserAttrs);
    // FIXME: Validate properly, body is an object with 1 or more fields to update, its not necessarily of type UserAttrs
    if (body !== undefined) {
    } else {
      resolve(body);
      reject(
        new Error("Bad request. The user does not have the fields specified.")
      );
    }
  });
}

export function patchUser(userId: number, body: any): Promise<UserInstance> {
  return validator(body)
    .then(body =>
      User.findById(userId).then(user => {
        if (!user) {
          throw new Error("User Not Found");
        }

        return update(userId, body);
      })
    )
    .tap(res => console.log("PATCH!!!!", res));
}
