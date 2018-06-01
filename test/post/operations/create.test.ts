import createUser from "./../../../src/user/operations/create";
import createPost from "./../../../src/post/operations/create";
import { Post, PostAttrs } from "./../../../src/post/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import { UserAttrs, User } from "../../../src/user/model";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("Post creation", function() {
  beforeEach(() => {
    return User.truncate({
      // where: {
      //   id: {
      //     [sequelize.Op.gt]: 0
      //   }
      // }
      cascade: true
    });
  });

  /*  after(() => {
    return User.destroy({ truncate: true });

    // afterEach(() => {aa
    //   transaction.rollback();
  });*/

  it("should create a Post", function() {
    const user: UserAttrs = {
      username: "usertest",
      password: "123456",
      email: "usertest@sb.com"
    };

    return expect(
      createUser(user)
        .then(newUser => {
          const post: PostAttrs = {
            title: "title1",
            content: "Dummy content",
            userId: newUser.id
          };
          // console.log("PostAttrs", post);
          return createPost(post);
        })
        // make sure post exists on db
        .then(newPost => {
          return Post.findOne({
            where: { id: newPost.id },
            include: [User]
          });
        })
    ).to.be.fulfilled.then(newPost => {
      // validate post has a user associated
      // return expect(newPost.user.username).to.eql(user.username);
      return expect(newPost.userId).to.be.a("number");
    });
  });

  it("should not create a Post with null fields", function() {
    const user: UserAttrs = {
      username: "usertest",
      password: "123456",
      email: "usertest@sb.com"
    };
    return expect(createUser(user)).to.eventually.be.fulfilled.then(newUser => {
      const post: PostAttrs = {
        title: "title1",
        content: null,
        userId: newUser.id
      };
      return expect(createPost(post)).to.eventually.be.rejectedWith(
        "Post.content cannot be null"
      );
    });
  });
  it("should not create a Post with invalid userId", function() {
    const post: PostAttrs = {
      title: "title1",
      content: "Dummy content",
      userId: -24
    };
    return expect(createPost(post)).to.eventually.be.rejectedWith(
      'insert or update on table "Posts" violates foreign key constraint "Posts_userId_fkey"'
    );
  });
});
