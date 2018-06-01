import destroy from "./../../../src/post/operations/delete";
import * as chaiAsPromised from "chai-as-promised";
import { expect, should } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import createUser from "./../../../src/user/operations/create";
import createPost from "./../../../src/post/operations/create";
import { User, UserAttrs } from "../../../src/user/model";
import { PostAttrs, Post } from "../../../src/post/model";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("Delete post", function() {
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

  it("should delete a post", function() {
    return expect(
      Post.findOne().then(post => {
        return destroy(post);
      })
    ).to.eventually.be.fulfilled.then(_ => {
      return expect(Post.findAll()).to.be.eventually.eql([]);
    });
    //   destroy(newUser).then(() => User.findAll())
    // ).to.be.eventually.eql([]);
  });
});
