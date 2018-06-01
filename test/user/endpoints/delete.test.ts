import { expect } from "chai";
import * as chai from "chai";
import { removeUser } from "../../../src/user/endpoints/delete";
import { UserAttrs, User } from "../../../src/user/model";
import { sequelize } from "../../../src/models/sequelize";
import * as chaiAsPromised from "chai-as-promised";
import * as Promise from "bluebird";

chai.use(chaiAsPromised);
after(function(done) {
  sequelize.close().then(() => done());
});
describe("DELETE /api/users", function() {
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

  it("should throw an error with an invalid id", function() {
    return expect(
      User.create(user1).then(_ => {
        return removeUser(-321);
      })
    ).to.eventually.be.rejectedWith("User Not Found");
  });

  it("should call deleteUser function", function() {
    return expect(
      User.create(user1).then(newUser => {
        return removeUser(newUser.id);
      })
    ).to.eventually.be.fulfilled.then(_ => {
      return expect(User.findAll()).to.be.eventually.eql([]);
    });
  });
});
