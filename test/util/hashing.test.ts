import hash from "../../src/util/hashing";
import { expect } from "chai";
import * as bcrypt from "bcryptjs";
import * as chaiAsPromised from "chai-as-promised";
import * as chai from "chai";
chai.use(chaiAsPromised);

describe("Hashing passwords", function() {
  it("should hash a string and compare to true", function() {
    return hash("myPassword").then(hashed => {
      return expect(bcrypt.compare("myPassword", hashed)).to.eventually.be.true;
    });
  });

  it("should hash a string and compare to false to a different string", function() {
    return hash("myPassword").then(hashed => {
      return expect(bcrypt.compare("notMyPassword", hashed)).to.eventually.be
        .false;
    });
  });
});
