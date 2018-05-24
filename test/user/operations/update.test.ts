import update from "./../../../src/user/operations/update";
import { UserAttrs, User, UserInstance } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("Update a user", function() {
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

  it("should update a user", function() {
    const newAttr = {
      ...user1,
      id: newUser.id,
      username: "userModified"
    };

    const updatedAttrs = {
      username: "userModified"
    };

    return expect(update(newUser.id, updatedAttrs)).to.eventually.have.property(
      "username",
      "userModified"
      //newUser.username
    );
  });

  it("should return error message with an invalid user id", function() {
    const newAttr = {
      username: "userModified"
    };

    return expect(update(-1544, newAttr)).to.eventually.rejectedWith(
      "No user with that ID"
    );
  });

  it("should not update a user with an invalid field", function() {
    const newAttr = {
      invalidField: "userModified"
    };

    return expect(update(newUser.id, newAttr)).to.eventually.be.fulfilled.then(
      (user: UserInstance) => {
        expect(user.changed()).to.be.false;
        // expect(user.invalidField).to.be.undefined;
      }
    );
  });
});
