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

  describe("Phone lines", () => {
    let purchase;

    before(done => {
      purchase = new Purchase();
      done();
    });

    it("Should add a new new phone line", done => {
      var currentLines = purchase.phoneLines.length;
      purchase.addPhoneLine();
      expect(purchase.phoneLines.length).to.be.not.equal(currentLines);
      expect(purchase.totalPrice()).to.be.equal(150);
      done();
    });

    it("Should delete a phone line", done => {
      purchase.deletePhoneLine();
      expect(purchase.phoneLines).to.be.empty;
      currentLines = purchase.phoneLines.length;
      purchase.deletePhoneLine();
      expect(purchase.phoneLines.length).to.be.equal(0);
      expect(purchase.totalPrice()).to.be.equal(0);
      done();
    });
  });

  describe("Phones", () => {
    let purchase;

    beforeEach(done => {
      purchase = new Purchase();
      done();
    });

    it("Should add Motorola phone", done => {
      purchase.addPhone("moto");
      expect(purchase.phones[0].name).to.be.equal("Motorola G99");
      expect(purchase.totalPrice() === 800).to.be.true;
      done();
    });

    it("Should add two Motorola phones", done => {
      purchase.addPhone("moto");
      purchase.addPhone("moto");
      expect(purchase.phones.length).to.be.equal(2);
      expect(purchase.phones[1].name).to.be.equal("Motorola G99");
      done();
    });

    it("Should remove a phone", done => {
      purchase.addPhone("moto");
      expect(purchase.phones).to.not.be.empty;
      purchase.removePhone("moto");
      expect(purchase.phones.length).to.be.equal(0);
      expect(purchase.totalPrice()).to.not.be.equal(800);
      done();
    });
  });

  describe("Cart", done => {
    let purchase;

    before(done => {
      purchase = new Purchase();
      purchase.addInternetConnection();
      done();
    });

    it("Should reflect on the order and its price", done => {
      console.log(purchase.getTotalCartInfo());
      expect(purchase.cart()).to.not.be.empty;
      expect(purchase.totalPrice()).to.be.equal(200);
      done();
    });
  });
});
