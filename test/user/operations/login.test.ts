import login from "./../../../src/user/operations/login";
import { UserAttrs, User } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect, should } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import create from "./../../../src/user/operations/create";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("Login and Auth", function() {
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    return User.destroy({
      where: {
        id: {
          [sequelize.Op.gt]: 0
        }
      }
    }).then(() => {
      return create(user1);
    });
  });

  afterEach(() => {
    return User.destroy({
      where: {
        id: {
          [sequelize.Op.gt]: 0
        }
      }
    });
  });

  // afterEach(() => {aa
  //   transaction.rollback();
  // });

  it("should create login token", function() {
    return expect(
      login("usertest@sb.com", "123456")
    ).to.eventually.be.fulfilled.then(token => {
      expect(token).to.have.property("token");
      expect(token.token).to.not.be.empty;
    });
  });

  it("should not create login token with an unknown email", function() {
    return expect(login("1234@sb.com", "")).to.eventually.be.rejectedWith(
      "The email provided is not registered"
    );
  });
  it("should not create login token with an invalid password", function() {
    return expect(
      login("usertest@sb.com", "InvalidPassword")
    ).to.eventually.be.rejectedWith("Invalid password");
  });
});
