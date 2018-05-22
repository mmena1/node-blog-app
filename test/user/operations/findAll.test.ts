import findAll from "./../../../src/user/operations/findAll";
import { UserAttrs, User } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect, should } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("All users", function() {
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  const user2: UserAttrs = {
    username: "usertest2",
    password: "1234567",
    email: "usertest2@sb.com"
  };
  const allUsers = [user1, user2];
  beforeEach(done => {
    User.destroy({
      where: {
        id: { [sequelize.Op.gt]: -100 }
      },
      truncate: true
    })
      .then(() => {
        return User.bulkCreate(allUsers);
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

  // afterEach(() => {aa
  //   transaction.rollback();
  // });

  it("should return al Users", function() {
    return expect(findAll())
      .to.eventually.be.fulfilled.and.to.be.lengthOf(2)
      .then((users: UserAttrs[]) =>
        users.map((user, index) =>
          expect(users[index]).to.include(allUsers[index])
        )
      );
  });
});
