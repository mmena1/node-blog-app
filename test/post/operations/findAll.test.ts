import findAll from "./../../../src/post/operations/findAll";
import createPost from "./../../../src/post/operations/create";
import createUser from "./../../../src/user/operations/create";
import { UserAttrs, User } from "./../../../src/user/model";
import * as chaiAsPromised from "chai-as-promised";
import { expect, should } from "chai";
import { sequelize } from "../../../src/models/sequelize";
import * as chai from "chai";
import { PostAttrs } from "../../../src/post/model";
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("All posts", function() {
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
  beforeEach(done => {
    User.truncate({
      cascade: true
    }).then(() => {
      return createUser(user1)
        .then(newUser => {
          const post: PostAttrs = {
            title: "title1",
            content: "Dummy1",
            userId: newUser.id
          };

          return createPost(post);
        })
        .then(_ => {
          createUser(user2).then(newUser2 => {
            const post2: PostAttrs = {
              title: "title2",
              content: "Dummy2",
              userId: newUser2.id
            };

            createPost(post2).then(() => done());
          });
        });
    });
  });

  it("should return all Posts", function() {
    return expect(findAll())
      .to.eventually.be.fulfilled.and.to.be.lengthOf(2)
      .then((posts: PostAttrs[]) =>
        posts.map((user, index) => {
          expect(posts[0]).to.include({
            title: "title1",
            content: "Dummy1"
          });
          expect(posts[1]).to.include({
            title: "title2",
            content: "Dummy2"
          });
        })
      );
  });
});
