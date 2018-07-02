import createFollowedUser from "./../../../src/followedUsers/operations/create";
import createUser from "./../../../src/user/operations/create";
import { UserAttrs, User } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import findAllFollowed from "../../../src/followedUsers/operations/findAll";
import * as Promise from "bluebird";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("FollowedUser.findAll", function() {

  beforeEach(() => {
    return User.truncate({
      cascade: true
    });
  });

  it("should return all followed users", function() {
    return expect(createUsers().then(user => {
      return findAllFollowed(user.followerUserId).then(followedUsers => {
        return User.findById(followedUsers[0].followingUserId);
      });
    })
    ).to.eventually.be.fulfilled.then(followedUser => {
      expect(followedUser.username).to.be.eql("usertest");
    });
  });
});

function createUsers() {
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
  const user3: UserAttrs = {
    username: "usertest3",
    password: "1234567",
    email: "usertest3@sb.com"
  };

 return  Promise.join(createUser(user1), createUser(user2), createUser(user3),
  (followingUser, followerUser, _otherUser) => {
    return createFollowedUser({
      followerUserId: followerUser.id,
      followingUserId: followingUser.id
    }).then(followedUser => followedUser);
  })
}
