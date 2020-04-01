const Items = require("./items.json");

//class declaration
class Pucharse {
  constructor() {
    this.price = 0;
    this.phones = [];
    this.phoneLines = [];
  }

  addPhoneLine() {
    // TODO implement me
    this.phoneLines.push(Items.phoneLine);
  }

  deletePhoneLine() {
    this.phoneLines.pop();
  }

  addPhone(id) {
    let phone = Items.phones.find(p => p.id === id);

    if (phone) {
      this.phones.push(phone);
    }
  }

  removePhone(id) {
    let phoneId = this.phones.findIndex(p => p.id === id);

    if (phoneId >= 0) this.phones.splice(phoneId, 1);
  }

  cart() {
    return [...this.phoneLines, ...this.phones];
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

var internetConnection = false; //boolean, by default false --> checkbox not selected
var phoneLines = 0; //int --> how many phone lines client want to buy; 0 by default
var cellPhones = new Array(); //array of strings
cellPhones = [
  "Motorola G99",
  "iPhone 99",
  "Samsung Galaxy 99",
  "Sony Xperia 99",
  "Huawei"
]; //phone names given in doc
var price; //int; different for each item
var totalPrice; //int

function addInternetConnection(internetConnection) {
  if (internetConnection === false) {
    internetConnection = true;
    this.totalPrice = this.totalPrice + 200;
  } else {
    internetConnection = false;
    this.totalPrice = totalPrice - 200;
  }
  return this.totalPrice;
}

function addPhoneLine() {}

function deletePhoneLine() {}

function addCellPhone(cellPhoneName) {}

function deleteCellPhone(cellPhoneName) {}

function buy() {}

module.exports = Pucharse;
