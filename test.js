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

  describe("Add phone", () => {
    it("should return 201 CREATED", done => {
      chai
        .request(app)
        .post("/phone")
        .send({ id: "iphone" })
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });

    it("should return a new price", done => {
      chai
        .request(app)
        .get("/cart")
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.price).to.be.eq(6000);
          done();
        });
    });
  });

  describe("Delete phone", () => {
    it("should return 200 OK", done => {
      chai
        .request(app)
        .delete("/phone")
        .send({ id: "iphone" })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });

    it("should return a new price", done => {
      chai
        .request(app)
        .get("/cart")
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.price).to.be.eq(0);
          done();
        });
    });
  });
});
