import * as Promise from "bluebird";
import create from "../../../src/followedUsers/operations/create";
import createUser from "../../../src/user/operations/create";
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

describe("FollowedUser.create", function() {
  beforeEach(() => {
    return User.truncate({ cascade: true });
  });

  it("should create an asssociation between Users", function() {
    return expect(createUsers().then(users => {
      const followedUser: FollowedUserAttrs = {
        followerUserId: users[0].id,
        followingUserId: users[1].id
      }
        
      return create(followedUser)
    })).to.eventually.be.fulfilled.then((followedUser: FollowedUserAttrs) => {
      expect(followedUser.id).to.be.a("number");
      expect(followedUser.followerUserId).to.be.a("number");
      expect(followedUser.followingUserId).to.be.a("number");
      
    });
  });

  it("should not create an asssociation between Users with invalid fields", function() {
      const followedUser: FollowedUserAttrs = {
        followerUserId: -3,
        followingUserId: -4
      }
      return expect(create(followedUser)).to.eventually.be.rejected;
      
  });

  it("should not create an asssociation between Users with null values", function() {
    const followedUser: FollowedUserAttrs = {
      followerUserId: null,
      followingUserId: null
    }
    return expect(create(followedUser)).to.eventually.be.rejected;
    
});

  // it("should not create a User with null fields", function() {
  //   const user: UserAttrs = {
  //     username: "usertest",
  //     password: null,
  //     email: "usertest@sb.com"
  //   };
  //   return expect(create(user)).to.eventually.be.rejectedWith(
  //     "User.password cannot be null"
  //   );
  // });
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
    return [user1, user2];
  });
}
