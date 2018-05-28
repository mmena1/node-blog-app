import * as request from "supertest";
import { expect } from "chai";
import { app } from "../../src/server/server";
import * as chai from "chai";

describe("GET /api", function() {
  it("should return welcome message", function() {
    return request(app)
      .get("/api")
      .expect(200)
      .then(res => expect(res.body).to.have.property("message"));
  });
});
