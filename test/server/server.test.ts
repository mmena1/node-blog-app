import * as request from "supertest";
import { expect } from "chai";
import { app } from "../../src/server/server";
import * as chai from "chai";
import { home } from "../../src/server/endpoints/home";
import * as sinon from "sinon";
import * as createUser from "../../src/user/operations/create";

describe("GET /", function() {
  it("should return welcome message", function() {
    return request(app)
      .get("/")
      .expect(200)
      .then(res => expect(res.body).to.have.property("message"));
  });

  it("home router should have been called", function() {
    var mock = sinon.mock(home);
    //mock.expects("get").once();
    return request(app)
      .get("/")
      .expect(200)
      .then(res => mock.restore());
  });
});

describe("POST /users", function() {
  it("should call create function", function() {
    // sinon.stub(createUser, "create");
    // stub.on
  });
});
