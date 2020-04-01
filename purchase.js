const Items = require("./items.json");

//class declaration
class Pucharse {
  constructor() {
    this.phones = [];
    this.phoneLines = [];
    this.internetConnection = false;
  }

  addInternetConnection() {
    this.internetConnection = true;
  }

  removeInternetConnection() {
    this.internetConnection = false;
  }

  addPhoneLine() {
    if (this.phoneLines.length < 8) {
      this.phoneLines.push(Items.phoneLine);
    }

    return this.phoneLines.length;
  }

  deletePhoneLine() {
    return this.phoneLines.pop();
  }

  addPhone(id) {
    let phone = Items.phones.find(p => p.id === id);
    let exists = this.phones.findIndex(p => p.id === id) !== -1;

    if (phone && !exists) {
      this.phones.push(phone);
    }

    return !exists ? phone : null;
  }

  removePhone(id) {
    let phoneId = this.phones.findIndex(p => p.id === id);

    if (phoneId >= 0) {
      return this.phones.splice(phoneId, 1);
    }

    return null;
  }

  cart() {
    let cart = [...this.phoneLines, ...this.phones];

    if (this.internetConnection) {
      cart.push(Items.internetConnection);
    }

    return cart;
  }

  totalPrice() {
    let price = 0;

    this.cart().map(item => {
      price += item.price;
    });

    return price;
  }

  getTotalCartInfo() {
    return {
      cart: this.cart(),
      price: this.totalPrice()
    };
  }
}

module.exports = Pucharse;
