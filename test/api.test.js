const chai = require("chai");
const chaiHttp = require("chai-http");
const { givenAsync } = require("mocha-testdata");

const { app, close } = require("../index");

const { expect } = chai;

chai.use(chaiHttp);

describe("API", () => {
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
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("Connection endpoint", () => {
    before(done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          done();
        });
    });

    it("should activate connection", done => {
      chai
        .request(app)
        .post("/connection")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.price).to.be.equal(200);
          done();
        });
    });

    it("should deactivate connection", done => {
      chai
        .request(app)
        .delete("/connection")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.price).to.be.equal(0);
        });
      done();
    });
  });

  describe("Phone endpoints", () => {
    before(done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          done();
        });
    });

    it("should return 201 CREATED", done => {
      chai
        .request(app)
        .post("/phone")
        .send({ id: "iphone" })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.phone.id).to.be.equal("iphone");
          done();
        });
    });

    it("should not allow to add the same", done => {
      chai
        .request(app)
        .post("/phone")
        .send({ id: "iphone" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should return a new price of 0", done => {
      chai
        .request(app)
        .get("/cart")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.price).to.be.eq(6000);
          done();
        });
    });

    it("should return 200 OK", done => {
      chai
        .request(app)
        .delete("/phone")
        .send({ id: "iphone" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("should return a new price of 0", done => {
      chai
        .request(app)
        .get("/cart")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.price).to.be.eq(0);
          done();
        });
    });

    it("should return 400 BAD REQUEST", done => {
      chai
        .request(app)
        .post("/phone")
        .send({ id: "an awesome id" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("PhoneLine endpoint", () => {
    before(done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          done();
        });
    });

    const PhoneLineData = [
      [-1, 400, undefined],
      [0, 200, 0],
      [4, 200, 600],
      [8, 200, 1200],
      [9, 400, undefined]
    ];

    givenAsync(PhoneLineData).test(
      "Test with amount, status, price",
      (done, amount, status, price) => {
        chai
          .request(app)
          .post("/phoneline")
          .send({ amount: amount })
          .end((err, res) => {
            expect(res).to.have.status(status);
            expect(res.body.price).to.be.equal(price);
            done();
          });
      }
    );
  });

  describe("Cart endpoint", () => {
    before(done => {
      // populate the cart
      chai
        .request(app)
        .get("/")
        .end((_, __) => {
          chai
            .request(app)
            .post("/phone")
            .send({ id: "iphone" })
            .end((_, __) => {
              chai
                .request(app)
                .post("/phoneline")
                .send({ amount: 2 })
                .end((_, __) => {
                  chai
                    .request(app)
                    .post("/connection")
                    .end((_, __) => {
                      done();
                    });
                });
            });
        });
    });

    it("should get a total cart", done => {
      chai
        .request(app)
        .get("/cart")
        .end((_, res) => {
          expect(res).to.have.status(200);
          expect(res.body.cart).to.have.length(4);
          expect(res.body.price).to.be.equal(6000 + 150 * 2 + 200);
          done();
        });
    });
  });
});
