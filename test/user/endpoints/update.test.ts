import { expect } from "chai";
import * as chai from "chai";
import { patchUser } from "../../../src/user/endpoints/updateApi";
import { UserAttrs, User } from "../../../src/user/model";
import { sequelize } from "../../../src/models/sequelize";
import * as chaiAsPromised from "chai-as-promised";
import * as Promise from "bluebird";

chai.use(chaiAsPromised);
after(function(done) {
  sequelize.close().then(() => done());
});
describe("PATCH /api/users", function() {
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    User.destroy({
      where: {
        id: {
          [sequelize.Op.gt]: 0
        }
      }
    });
  });

  it("should throw an error with an invalid field", function() {
    return expect(
      User.create(user1).then(newUser => {
        return patchUser(newUser.id, { invalidField: "userName" });
      })
    ).to.eventually.be.rejectedWith(
      "Bad request. The user does not have the fields specified."
    );
  });

  it("should call patchUser function", function() {
    return expect(
      User.create(user1).then(newUser => {
        return patchUser(newUser.id, { email: "userName" });
      })
    ).to.eventually.be.fulfilled.then(updatedUser => {
      expect(updatedUser).to.have.property("email", "userName");
    });
  });

  it("should throw an error with an invalid field and a valid field", function() {
    return expect(
      User.create(user1).then(newUser => {
        return patchUser(newUser.id, {
          invalidField: "userName",
          email: "email"
        });
      })
    ).to.eventually.be.rejectedWith(
      "Bad request. The user does not have the fields specified."
    );
  });
});
