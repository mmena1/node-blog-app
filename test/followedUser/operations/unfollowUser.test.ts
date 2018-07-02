import * as Promise from "bluebird";
import create from "../../../src/followedUsers/operations/create";
import createUser from "../../../src/user/operations/create";
import unfollowUser from "../../../src/followedUsers/operations/unfollowUser"
import {
  FollowedUserAttrs,
  FollowedUser
} from "./../../../src/followedUsers/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import { User, UserAttrs } from "../../../src/user/model";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("FollowedUser.unfollow", function() {
  beforeEach(() => {
    return User.truncate({ cascade: true });
  });

  it("should unfollow a user", function() {
    return expect(createUsers().then(followedUser => {
      return unfollowUser({
        followerUserId: followedUser.followerUserId,
        followingUserId: followedUser.followingUserId
      })
    })
    ).to.eventually.be.fulfilled.then(() => {
      return expect(FollowedUser.findAll()).to.eventually.be.fulfilled.then(users => {
        expect(users).to.be.empty;
      })
    });
  });

  it("should not unfollow a user with invalid fields", function() {
    return expect(createUsers().then(followedUser => {
      return unfollowUser({
        followerUserId: followedUser.followerUserId,
        followingUserId: -12
      })
    })
    ).to.eventually.be.fulfilled.then((rowsDeleted) => {
      return expect(rowsDeleted).to.be.eql(0);
    });
  });
});

function createUsers() {
  const user1: UserAttrs = {
    username: "usertest1",
    password: "123456",
    email: "usertest1@sb.com"
  };
  const user2: UserAttrs = {
    username: "usertest2",
    password: "123456",
    email: "usertest2@sb.com"
  };
  return Promise.join(createUser(user1), createUser(user2), (user1, user2) => {
    const followedUser: FollowedUserAttrs = {
      followerUserId: user1.id,
      followingUserId: user2.id
    };

    return create(followedUser);
  });
}
