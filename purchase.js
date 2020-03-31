//class declaration
class pucharse {
    constructor(price){
        this.price = price;
    } 
}

var internetConnection = false; //boolean, by default false --> checkbox not selected
var phoneLines = 0; //int --> how many phone lines client want to buy; 0 by default
var cellPhones = new Array(); //array of strings
cellPhones = ['Motorola G99', 'iPhone 99', 'Samsung Galaxy 99', 'Sony Xperia 99', 'Huawei']; //phone names given in doc
var price; //int; different for each item
var totalPrice; //int 

function addInternetConnection(internetConnection){

    if(internetConnection === false){
        internetConnection = true;
        this.totalPrice = this.totalPrice + 200;
    }
    else{
        internetConnection = false;
        this.totalPrice = totalPrice - 200;
    }
    return this.totalPrice;
}

function addPhoneLine(){

}

function deletePhoneLine(){

}

function addCellPhone(cellPhoneName){

}

function deleteCellPhone(cellPhoneName){

    
}

function buy(){

}


