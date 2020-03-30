const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, close } = require("./index");

const { expect } = chai;

chai.use(chaiHttp);

describe("Ping", () => {
  after(done => {
    // close connections after testing
    close();
    done();
  });

  // test pinging
  describe("GET /ping", () => {
    it("should return 200 OK", done => {
      chai
        .request(app)
        .get("/ping")
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
  });
});
