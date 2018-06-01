import update from "./../../../src/post/operations/update";
import createPost from "./../../../src/post/operations/create";
import createUser from "./../../../src/user/operations/create";
import { UserAttrs, User, UserInstance } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import { PostAttrs, Post } from "../../../src/post/model";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("Update a post", function() {
  const user1: UserAttrs = {
    username: "usertest",
    password: "123456",
    email: "usertest@sb.com"
  };
  beforeEach(() => {
    return User.truncate({
      cascade: true
    }).then(() => {
      return createUser(user1).then(user => {
        const post: PostAttrs = {
          title: "title1",
          content: "Dummy content",
          userId: user.id
        };
        return createPost(post);
      });
    });
  });

  afterEach(() => {
    return User.destroy({
      where: {
        id: {
          [sequelize.Op.gt]: 0
        }
      }
    });
  });

  it("should update a post", function() {
    return expect(
      Post.findOne().then(post => {
        return update(post.id, { title: "My Title" });
      })
    ).to.eventually.have.property("title", "My Title");
  });

  it("should return error message with an invalid post id", function() {
    return expect(update(-1544, {})).to.eventually.rejectedWith(
      "No post with that ID"
    );
  });

  it("should not update a post with an invalid field", function() {
    return expect(
      Post.findOne().then(post => {
        return update(post.id, { invalid: "" });
      })
    ).to.eventually.be.fulfilled.then((postUpdated: UserInstance) => {
      expect(postUpdated.changed()).to.be.false;
      // expect(user.invalidField).to.be.undefined;
    });
  });
  it("should not change a post userId", function() {
    return expect(
      Post.findOne().then(post => {
        return update(post.id, { userId: 21 });
      })
    ).to.eventually.be.rejectedWith("Cannot change userId");
  });
});
