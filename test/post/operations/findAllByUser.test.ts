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
chai.use(chaiAsPromised);

after(function(done) {
  sequelize.close().then(() => done());
});

describe("All posts by User", function() {
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

  beforeEach(() => {
    return User.truncate({
      cascade: true
    });
  });

  it("should return all Posts of a user", function() {
    return expect(
      createUser(user1).then(newUser => {
        const post: PostAttrs = {
          title: "title1",
          content: "Dummy1",
          userId: newUser.id
        };

        return createPost(post);
      })
    ).to.eventually.be.fulfilled.then(_ => {
      return expect(
        createUser(user2).then(newUser2 => {
          const post2: PostAttrs = {
            title: "title2",
            content: "Dummy2",
            userId: newUser2.id
          };

          return createPost(post2);
        })
      ).to.eventually.be.fulfilled.then(post2 => {
        return expect(findAllByUser(post2.userId))
          .to.eventually.be.fulfilled.and.to.be.lengthOf(1)
          .then((posts: PostAttrs[]) => {
            posts.map((user, index) =>
              expect(posts[index]).to.include({
                title: "title2",
                content: "Dummy2"
              })
            );
          });
      });
    });
  });
});
