"use strict";
console.log("ts file loaded...");
// classes
var Invoice = /** @class */ (function () {
    function Invoice(c, d, a) {
        this.client = c;
        this.details = d;
        this.amount = a;
    }
    ;
    Invoice.prototype.format = function () {
        return this.client + " owes $" + this.amount + " for " + this.details;
    };
    return Invoice;
}());
// instantiate the class  //pass the constructor values
var invOne = new Invoice('mario', 'works on the mario website', 250);
var invTwo = new Invoice('luigi', 'works on the mario website', 300);
// create an array of type invoices
var invoices = [];
invoices.push(invOne);
invoices.push(invTwo);
console.log('invoices array', invoices);
//execute the function inside the array
invoices.forEach(function (inv) {
    console.log("inv.format()-", inv.format());
});
// when we specify ! symbol then we tell typescript the element exists
var anchor = document.querySelector('a');
console.log(anchor.href);
//when we specify the type(eg:HTMLFormElement) using the as keyword, we get all the respective intellisense for that element
var form = document.querySelector('.new-item-form');
//  console.log(form.children);
//inputs
var type = document.querySelector('#type');
var tofrom = document.querySelector('#tofrom');
var details = document.querySelector('#details');
var amount = document.querySelector('#amount');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('form-submission', type.value, tofrom.value, details.value, amount.valueAsNumber);
});
