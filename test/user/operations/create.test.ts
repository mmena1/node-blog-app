import create from "./../../../src/user/operations/create";
import { UserAttrs, User } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import * as bcrypt from "bcryptjs";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("User creation", function() {
  beforeEach(() => {
    return User.destroy({ truncate: true });
  });

  after(() => {
    return User.destroy({ truncate: true });

    // afterEach(() => {aa
    //   transaction.rollback();
  });

  it("should create a User", function() {
    const user: UserAttrs = {
      username: "usertest",
      password: "123456",
      email: "usertest@sb.com"
    };
    // create(user).then();
    return expect(create(user)).to.eventually.be.fulfilled.then(newUser => {
      expect(newUser).to.have.property("username", "usertest");
      expect(newUser).to.have.property("email", "usertest@sb.com");
      console.log("password", newUser.password);

      return expect(bcrypt.compare("123456", newUser.password)).to.eventually.be
        .true;
    }); //.deep.include(user);
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
