import * as request from "supertest";
import { expect } from "chai";
import * as chai from "chai";
import { updateUser, patchUser } from "../../../src/user/endpoints/update";
import * as sinon from "sinon";
import update from "../../../src/user/operations/update";
import { UserInstance, UserAttrs, User } from "../../../src/user/model";
import { sequelize } from "../../../src/models/sequelize";
import * as chaiAsPromised from "chai-as-promised";
import * as Promise from "bluebird";

chai.use(chaiAsPromised);
after(function(done) {
  sequelize.close().then(() => done());
});
describe("PATCH /users", function() {
  let newUser: UserInstance;
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    User.destroy({ truncate: true });

    // .then(() => done());
  });

  it("should throw an error with an invalid field", function() {
    return expect(
      User.create(user1).then(newUser => {
        return patchUser(newUser.id, { invalidField: "userName" }).tap(res =>
          console.log("LKASJDLKJSA", res)
        );
      })
    ).to.eventually.be.rejectedWith(
      "Bad request. The user does not have the fields specified."
    );

    //   return User.create(user1)
    //     .then(
    //       user => {
    //         return expect(
    //           patchUser(user.id, { email: "userName" }).tap(res =>
    //             console.log("LKASJDLKJSA", res)
    //           )
    //         ).to.eventually.equal({
    //           status: 400,
    //           message: "Bad request. The user does not have the fields specified."
    //         });
    //       }
    //       // FIXME: test is hanging up
    //     )
    //     .tap(res => console.log("ZXCVBNM", res));
    // });
  });

  it("should call updateUser function", function() {
    return expect(
      User.create(user1).then(newUser => {
        return patchUser(newUser.id, { email: "userName" }).tap(res =>
          console.log("LKASJDLKJSA", res)
        );
      })
    ).to.eventually.be.fulfilled.then(updatedUser => {
      //
      expect(updatedUser).to.have.property("email", "userName");
    });
  });
});
