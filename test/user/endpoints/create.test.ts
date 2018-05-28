import { expect } from "chai";
import * as chai from "chai";
import { postUser } from "../../../src/user/endpoints/create";
import { UserAttrs, User } from "../../../src/user/model";
import { sequelize } from "../../../src/models/sequelize";
import * as chaiAsPromised from "chai-as-promised";
import * as Promise from "bluebird";

chai.use(chaiAsPromised);
after(function(done) {
  sequelize.close().then(() => done());
});
describe("POST /api/users", function() {
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    User.destroy({ truncate: true });
  });

  it("should call postUser function", function() {
    return expect(postUser(user1)).to.eventually.be.fulfilled.then(
      createdUser => {
        expect(createdUser).to.have.property("email", "usertest@sb.com");
      }
    );
  });
});
