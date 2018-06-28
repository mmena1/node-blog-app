import * as request from "supertest";
import { expect } from "chai";
import { app } from "../../src/server/server";
import * as chai from "chai";
import { UserInstance, UserAttrs, User } from "../../src/user/model";
import create from "../../src/user/operations/create";
import login from "../../src/user/operations/login";
import { sequelize } from "../../src/models/sequelize";

describe("GET /api", function() {
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    return User.destroy({
      where: {
        id: {
          [sequelize.Op.gt]: 0
        }
      }
    });
  });

  afterEach(() => {
    return User.destroy({
      where: {
        id: {
          [sequelize.Op.gt]: 0
        }
      }
    });
  });
  it.only("should return welcome message", function() {
    return create(user1).then(user => {
      return expect(
        login("usertest@sb.com", "123456")
      ).to.eventually.be.fulfilled.then(token => {
        return request(app)
          .get("/")
          .set("authorization", token.token)
          .expect(200)
          .then(res => {
            expect(res.text).to.contain("Welcome");
          });
      });
    });
  });
  it("should return 403 error with invalid token", function() {
    return create(user1).then(user => {
      return expect(
        login("usertest@sb.com", "123456")
      ).to.eventually.be.fulfilled.then(token => {
        return request(app)
          .get("/api")
          .set("authorization", token.token + "123asd")
          .expect(403)
          .then(res => {
            console.log(res);

            expect(res.text).to.contain(
              "You have no access permissions to view this resource"
            );
          });
      });
    });
  });
});
