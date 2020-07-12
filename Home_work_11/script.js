'use strict'

const SIZE_SMALL = {price: 50, callories: 20};
const SIZE_MID = {price: 75, callories: 30};
const SIZE_BIG = {price: 100, callories: 40};

const TOPPING_CHEESE = {price: 10, callories: 20};
const TOPPING_SALAD = {price: 20, callories: 5};
const TOPPING_POTATO = {price: 15, callories: 10};
const TOPPING_SEASONING = {price: 15, callories: 0};
const TOPPING_MAYO = {price: 20, callories: 5};

function Hamburger({price, callories}) {
    this.price = price;
    this.callories = callories;
}

Hamburger.prototype.addTopping = function(topping) {
    this.price += topping.price;
    this.callories += topping.callories;
}

Hamburger.prototype.getPrice = function() {
    console.log('Total Price: ' + this.price);
}

Hamburger.prototype.getCallories = function() {
    console.log('Total Callories: ' + this.callories);
}
