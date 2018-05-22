import create from "./../../../src/user/operations/create";
import { UserAttrs, User } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("User creation", function() {
  beforeEach(done => {
    User.destroy({
      where: {
        id: { [sequelize.Op.gt]: -100 }
      }
    }).then(() => done());
  });

  after(done => {
    User.destroy({
      where: {
        id: { [sequelize.Op.gt]: -100 }
      }
    }).then(() => done());
  });

  // afterEach(() => {aa
  //   transaction.rollback();
  // });

  it("should create a User", function() {
    const user: UserAttrs = {
      username: "usertest",
      password: "123456",
      email: "usertest@sb.com"
    };
    return expect(create(user)).to.eventually.deep.include(user);
  });

  it("should not create a User with null fields", function() {
    const user: UserAttrs = {
      username: "usertest",
      password: null,
      email: "usertest@sb.com"
    };
    return expect(create(user)).to.eventually.be.rejectedWith(
      "User.password cannot be null"
    );
  });
});
