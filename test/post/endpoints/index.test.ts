import findAllByUser from "./../../../src/post/operations/findAllByUser";
import createPost from "./../../../src/post/operations/create";
import createUser from "./../../../src/user/operations/create";
import { UserAttrs, User } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect, should } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import { PostAttrs } from "../../../src/post/model";
import findAll from "../../../src/post/operations/findAll";
import { getPostsWithUsers } from "../../../src/server/endpoints/index";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe.only("Get all posts", function() {
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
  const post1 = {
    // No type here because we don't have yet an userId
    content: "post 1 content",
    title: "post 1"
  };
  beforeEach(() => {
    return User.truncate({
      cascade: true
    }).then(() =>
      createUser(user1).then(user => createPost({ ...post1, userId: user.id }))
    );
  });

  it("getPostsWithUsers returns all the posts with the users", function() {
    return expect(getPostsWithUsers()).to.eventually.be.fulfilled.then(
      posts => {
        expect(posts).to.have.lengthOf(1);
        expect(posts[0]).to.deep.include(user1);
        expect(posts[0]).to.deep.include(post1);
      }
    );
  });
});
