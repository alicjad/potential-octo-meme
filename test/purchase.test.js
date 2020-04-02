const assert = require("assert");
const given = require("mocha-testdata");
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

  describe("Test phone lines", () => {
    let purchase;

    given(
      {
        linesToAdd: 1,
        linesToDelete: 0,
        expectedNumberOfLines: 1,
        expectedPrice: 150
      },
      {
        linesToAdd: 2,
        linesToDelete: 1,
        expectedNumberOfLines: 1,
        expectedPrice: 150
      },
      {
        linesToAdd: 0,
        linesToDelete: 1,
        expectedNumberOfLines: 0,
        expectedPrice: 0
      },
      {
        linesToAdd: 9,
        linesToDelete: 0,
        //max number of phone lines = 8
        expectedNumberOfLines: 8,
        expectedPrice: 1200
      },
      {
        linesToAdd: 8,
        linesToDelete: 0,
        expectedNumberOfLines: 8,
        expectedPrice: 1200
      }
    ).it("passes when total price matches", value => {
      purchase = new Purchase();

      for (let index = 0; index < value.linesToAdd; index++) {
        purchase.addPhoneLine();
      }
      for (index = 0; index < value.linesToDelete; index++) {
        purchase.deletePhoneLine();
      }
      expect(purchase.totalPrice(), "total price").to.be.equal(
        value.expectedPrice
      );
      expect(purchase.phoneLines.length, "number of lines").to.be.equal(
        value.expectedNumberOfLines
      );
    });
  });

  describe("Phones", () => {
    let purchase;

    given(
      {
        phonesToAdd: ["moto", "moto"],
        phonesToRemove: [],
        expectedPhoneNames: ["Motorola G99", "Motorola G99"],
        expectedPrice: 1600,
        expectedLength: 2
      },
      {
        phonesToAdd: ["moto", "moto"],
        phonesToRemove: ["moto"],
        expectedPhoneNames: ["Motorola G99"],
        expectedPrice: 800,
        expectedLength: 1
      },
      {
        phonesToAdd: ["moto"],
        phonesToRemove: [],
        expectedPhoneNames: ["Motorola G99"],
        expectedPrice: 800,
        expectedLength: 1
      },
      {
        phonesToAdd: ["moto"],
        phonesToRemove: ["moto"],
        expectedPhoneNames: [],
        expectedPrice: 0,
        expectedLength: 0
      },
      {
        phonesToAdd: ["moto"],
        phonesToRemove: ["iphone"],
        expectedPhoneNames: ["Motorola G99"],
        expectedPrice: 800,
        expectedLength: 1
      },
      {
        phonesToAdd: [],
        phonesToRemove: [],
        expectedPhoneNames: [],
        expectedPrice: 0,
        expectedLength: 0
      },
      {
        phonesToAdd: [],
        phonesToRemove: ["iphone"],
        expectedPhoneNames: [],
        expectedPrice: 0,
        expectedLength: 0
      },
      {
        phonesToAdd: ["xyz"],
        phonesToRemove: [],
        expectedPhoneNames: [],
        expectedPrice: 0,
        expectedLength: 0
      },
      {
        phonesToAdd: [],
        phonesToRemove: ["xyz"],
        expectedPhoneNames: [],
        expectedPrice: 0,
        expectedLength: 0
      }
    ).it("passes if total price matches", value => {
      purchase = new Purchase();
      value.phonesToAdd.forEach(phone => {
        purchase.addPhone(phone);
      });
      value.phonesToRemove.forEach(phone => {
        purchase.removePhone(phone);
      });
      for (let index = 0; index < value.expectedPhoneNames.length; index++) {
        expect(purchase.phones[index].name, "names").to.be.equal(
          value.expectedPhoneNames[index]
        );
      }
      expect(purchase.totalPrice(), "total price").to.be.equal(
        value.expectedPrice
      );
      expect(purchase.phones.length, "length").to.be.equal(
        value.expectedLength
      );
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
