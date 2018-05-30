import destroy from "./../../../src/user/operations/delete";
import { UserAttrs, User, UserInstance } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect, should } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("Delete user", function() {
  let newUser: UserInstance;
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    return User.destroy({ truncate: true }).then(() => {
      return User.create(user1).then(user => {
        newUser = user;
      });
    });
  });

  afterEach(() => {
    return User.destroy({ truncate: true });
  });

  it("should delete a user", function() {
    return expect(
      destroy(newUser).then(() => User.findAll())
    ).to.be.eventually.eql([]);
  });
});
