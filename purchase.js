//class declaration
class Pucharse {
  constructor() {
    this.price = 0;
    this.phones = [];
    this.phoneLines = [];
    this.internetConnection = false;
  }

  //TODO - create "buy()"

  //adding and deducting cost without using totalPrice() - to be changed?
  addInternetConnection() {
    if (internetConnection === false) {
      internetConnection = true;
      this.price = this.price + 200;
    } else {
      internetConnection = false;
      this.price = this.price - 200;
    }
    return this.price;
  }

  addPhoneLine() {
    //this.totalPrice = this.totalPrice + 150; how I would do it
    this.phoneLines.push(phoneLine);
    //this.price should be a sum for current order
    return this.price;
  }

  //no deduction from order's sum
  deletePhoneLine() {
    this.phoneLines.pop();
  }

  //is adding the price to the sum covered? totalPrice() is not called here
  addPhone(id) {
    let phone = Phones.find(p => p.id === id);

    if (phone) {
      this.phones.push(phone);
    }
  }

  //add deducting the price of given phone from the sum(=total price)
  removePhone(id) {
    let phoneId = this.phones.findIndex(p => p.id === id);

    if (phoneId >= 0) this.phones.splice(phoneId, 1);
  }

  //add "internet connection" if this.internetConnection===true
  cart() {
    return [...this.phoneLines, ...this.phones];
  }

  totalPrice() {
    //price is set to 0 every time?
    let price = 0;
    this.cart().map(item => {
      price += item.price;
    });

    return price;
  }
}

//dictionaries
const Phones = [
  { id: "moto", name: "Motorola G99", price: 800 },
  { id: "iphone", name: "iPhone 99", price: 6000 },
  { id: "samsung", name: "Samsung Galaxy 99", price: 1000 },
  { id: "sony", name: "Sony Experia 99", price: 900 },
  { id: "huawei", name: "Huawei 99", price: 900 }
];

const phoneLine = {
  id: "phoneLine",
  name: "Phone Line",
  price: 150
};

const internetConn = {
  id: "internet",
  name: "Internet Connection",
  price: 200
};

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
var price; //int different for each item
//var totalPrice; //int, commented out as we use totalPrice method

//testing
let p = new Pucharse();
p.addPhone("moto");
p.addPhone("iphone");
p.addPhoneLine();
console.log(p.totalPrice());
console.log(p.cart());
