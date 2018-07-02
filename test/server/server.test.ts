import * as request from "supertest";
import { expect } from "chai";
import { app } from "../../src/server/server";
import * as chai from "chai";
import { UserInstance, UserAttrs, User } from "../../src/user/model";
import create from "../../src/user/operations/create";
import login from "../../src/user/operations/login";
import { sequelize } from "../../src/models/sequelize";

describe("GET /home", function() {
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    return User.truncate({cascade: true});
  });

  it("should return welcome message", function() {
    return create(user1).then(user => {
      return expect(
        login(user.email, "123456")
      ).to.eventually.be.fulfilled.then(token => {
        return request(app)
          .get("/home")
          .set("authorization", token.token)
          .expect(200) // FIXME getting error 500
          .then(res => {
            expect(res.text).to.contain("Welcome");
          });
      });
    });
  });
  it("should return 403 error with invalid token", function() {
    return create(user1).then(user => {
      return expect(
        login(user.email, "123456")
      ).to.eventually.be.fulfilled.then(token => {
        return request(app)
          .get("/home")
          .set("authorization", token.token + "123asd")
          .expect(403) // FIXME getting status 302
          .then(res => {
            expect(res.text).to.contain(
              "You have no access permissions to view this resource"
            );
          });
      });
    });
  });
});
