import login from "./../../../src/user/operations/login";
import create from "./../../../src/user/operations/create";
import verifyToken from "./../../../src/user/operations/verifyToken";
import { UserAttrs, User } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect, should } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("Validate auth token", function() {
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    return User.destroy({ truncate: true }).then(() => {
      return create(user1);
    });
  });

  afterEach(() => {
    return User.destroy({ truncate: true });
  });

  // afterEach(() => {aa
  //   transaction.rollback();
  // });

  it("should validate login token", function() {
    return expect(
      login("usertest@sb.com", "123456")
    ).to.eventually.be.fulfilled.then(token => {
      return expect(
        verifyToken(token.token, "0.rfyj3n9nzh")
      ).to.eventually.be.fulfilled.then(res => expect(res).to.be.true);
    });
  });
});
