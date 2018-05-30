import * as request from "supertest";
import { expect } from "chai";
import { app } from "../../src/server/server";
import * as chai from "chai";
import { UserInstance, UserAttrs, User } from "../../src/user/model";
import create from "../../src/user/operations/create";
import login from "../../src/user/operations/login";

describe("GET /api", function() {
  beforeEach(() => {
    return User.destroy({ truncate: true });
  });

  afterEach(() => {
    return User.destroy({ truncate: true });
  });
  it("should return welcome message", function() {
    const user1: UserAttrs = {
      username: "usertest",
      password: "123456",
      email: "usertest@sb.com"
    };
    return create(user1).then(user => {
      return expect(
        login("usertest@sb.com", "123456")
      ).to.eventually.be.fulfilled.then(token => {
        return request(app)
          .get("/api")
          .set("authorization", token.token)
          .expect(200)
          .then(res => expect(res.body).to.have.property("message"));
      });
    });
  });
});
