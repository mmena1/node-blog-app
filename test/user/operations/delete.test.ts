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
  beforeEach(done => {
    User.destroy({
      where: {
        id: { [sequelize.Op.gt]: -100 }
      },
      truncate: true
    })
      .then(() => {
        return User.create(user1).then(user => {
          newUser = user;
          console.log("user", user);
        });
      })
      .then(() => done());
  });

  afterEach(done => {
    User.destroy({
      where: {
        id: { [sequelize.Op.gt]: -100 }
      }
    }).then(() => done());
  });

  it("should delete a user", function() {
    console.log("newUser", newUser);
    return expect(
      destroy(newUser).then(() => User.findAll())
    ).to.be.eventually.eql([]);
  });
});
