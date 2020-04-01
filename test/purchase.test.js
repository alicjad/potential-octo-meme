const chai = require("chai");
const Purchase = require("../purchase");

const { expect } = chai;

describe("Purchase tests", () => {
  describe("Internet connection", () => {
    let purchase;

    before(done => {
      purchase = new Purchase();
      done();
    });

    it("should enable interneted connection", done => {
      purchase.addInternetConnection();
      expect(purchase.internetConnection).to.be.true;
      done();
    });

    it("Should reflect on price", done => {
      expect(purchase.totalPrice()).to.be.equal(200);
      done();
    });

    it("should remove internet connection", done => {
      purchase.removeInternetConnection();
      expect(purchase.internetConnection).to.be.false;
      expect(purchase.totalPrice()).to.be.equal(0);
      done();
    });
  });
});
