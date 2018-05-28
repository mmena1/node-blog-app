import { expect } from "chai";
import * as chai from "chai";
import { getUsers } from "../../../src/user/endpoints/findAll";
import { UserAttrs, User } from "../../../src/user/model";
import { sequelize } from "../../../src/models/sequelize";
import * as chaiAsPromised from "chai-as-promised";
import * as Promise from "bluebird";

chai.use(chaiAsPromised);
after(function(done) {
  sequelize.close().then(() => done());
});
describe("POST /api/users", function() {
  const allUsers: UserAttrs[] = [
    {
      username: "usertest",
      password: "123456",
      email: "usertest@sb.com"
    },
    {
      username: "usertest2",
      password: "1234567",
      email: "usertest2@sb.com"
    }
  ];
  beforeEach(() => {
    User.destroy({ truncate: true });
  });

  it("should call postUser function", function() {
    return expect(User.bulkCreate(allUsers))
      .to.eventually.be.fulfilled.and.to.be.lengthOf(2)
      .then((users: UserAttrs[]) =>
        users.map((user, index) =>
          expect(users[index]).to.include(allUsers[index])
        )
      );
  });
});
