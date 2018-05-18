import * as request from "supertest";
import { expect } from "chai";
import * as app from "../../src/server/server";

describe("GET /", function() {
  it("should return welcome message", function() {
    return request(app)
      .get("/")
      .expect(200)
      .then(res => expect(res.body).to.have.property("message"));
  });
});
