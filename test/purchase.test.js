const given = require("mocha-testdata");
const chai = require("chai");

const Purchase = require("../purchase");

const { expect, assert } = chai;

describe("Purchase tests", () => {
  describe("Internet connection", () => {
    let purchase;

    before(done => {
      purchase = new Purchase();
      done();
    });

    it("Should enable interneted connection", () => {
      let result = purchase.addInternetConnection();
      expect(purchase.internetConnection).to.be.true;
      expect(result).to.be.undefined;
    });

    it("Should reflect on price", () => {
      expect(purchase.totalPrice()).to.be.equal(200);
    });

    it("Should remove internet connection", () => {
      let result = purchase.removeInternetConnection();
      expect(purchase.internetConnection).to.be.false;
      expect(purchase.totalPrice()).to.be.equal(0);
      expect(result).to.be.undefined;
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

    beforeEach(done => {
      purchase = new Purchase();
      done();
    });

    it("Should return the added phone", () => {
      let phone = purchase.addPhone("iphone");

      expect(phone).to.be.not.undefined;
      expect(phone.id).to.be.equal("iphone");
    });

    it("Should return the removed phone", () => {
      purchase.addPhone("iphone");
      purchase.addPhone("moto");

      let phone = purchase.removePhone("iphone");

      expect(purchase.phones.length).to.be.equal(1);
      expect(phone).to.be.not.undefined;
      expect(phone.id).to.be.equal("iphone");
    });

    it("Should return undefined for adding wrong phone id", () => {
      let phone = purchase.addPhone("xyz");

      expect(phone).to.be.undefined;
    });

    it("Should return undefined for removing wrong phone id", () => {
      let phone = purchase.removePhone("xyz");

      expect(phone).to.be.undefined;
    });

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
    ).test("passes if total price matches", value => {
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

  describe("Cart", () => {
    let purchase;

    before(done => {
      purchase = new Purchase();
      purchase.addInternetConnection();
      done();
    });

    it("Should reflect on the order and its price", () => {
      expect(purchase.cart()).to.not.be.empty;
      expect(purchase.totalPrice()).to.be.equal(200);
    });

    it("Should reflect in total cart info", () => {
      let info = purchase.getTotalCartInfo();
      expect(info.cart).to.be.not.empty;
    });

    it("Total price should be a number", () => {
      assert.isNumber(purchase.totalPrice());
    });
  });
});
