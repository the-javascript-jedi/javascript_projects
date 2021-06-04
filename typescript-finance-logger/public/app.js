import { Invoice } from './classes/Invoice.js';
import { Payment } from './classes/Payment.js';
// when we specify ! symbol then we tell typescript the element exists
const anchor = document.querySelector('a');
console.log(anchor.href);
//when we specify the type(eg:HTMLFormElement) using the as keyword, we get all the respective intellisense for that element
const form = document.querySelector('.new-item-form');
//console.log(form.children);
//inputs
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //HasFormatter interface type
    let doc;
    if (type.value === 'invoice') {
        // if ddl value is invoice
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
    }
    else {
        // if ddl value is payment
        doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
    }
    console.log('doc', doc);
});
