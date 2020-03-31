//class declaration
class Pucharse {
  constructor() {
    this.price = 0;
    this.phones = [];
  }

  addPhoneLine() {
    // TODO implement me
    console.log('addPhoneLineMethod')
  }

  deletePhoneLine() {
    // TODO implemenet me
  }

  addPhone(id) {
    let phone = Phones.find(p => p.id === id);

    if (phone) {
      this.phones.push(phone);
    }
  }

  removePhone(id) {
    let phoneId = this.phones.findIndex(p => p.id === id);

    if (phoneId >= 0)
      this.phones.splice(phoneId, 1);
  }
}

const Phones = [
  { id: 'moto', name: 'Motorola G99', price: 800 },
  { id: 'iphone', name: 'iPhone 99', price: 6000 },
  { id: 'samsung', name: 'Samsung Galaxy 99', price: 1000 },
  { id: 'sony', name: 'Sony Experia 99', price: 900 },
  { id: 'huawei', name: 'Huawei 99', price: 900 }
]

var internetConnection = false; //boolean, by default false --> checkbox not selected
var phoneLines = 0; //int --> how many phone lines client want to buy; 0 by default
var cellPhones = new Array(); //array of strings
cellPhones = ['Motorola G99', 'iPhone 99', 'Samsung Galaxy 99', 'Sony Xperia 99', 'Huawei']; //phone names given in doc
var price; //int; different for each item
var totalPrice; //int 

function addInternetConnection(internetConnection) {

  if (internetConnection === false) {
    internetConnection = true;
    this.totalPrice = this.totalPrice + 200;
  }
  else {
    internetConnection = false;
    this.totalPrice = totalPrice - 200;
  }
  return this.totalPrice;
}

function addPhoneLine() {

}

function deletePhoneLine() {

}

function addCellPhone(cellPhoneName) {

}

function deleteCellPhone(cellPhoneName) {


}

function buy() {

}

let p = new Pucharse()
p.addPhone('moto');
p.addPhone('iphone');
console.log(p.phones)
p.removePhone('moto');
console.log(p.phones)