import {Invoice} from './classes/Invoice.js';
import { ListTempalte } from './classes/ListTemplate.js';
import {Payment} from './classes/Payment.js';
import {HasFormatter} from './interfaces/HasFormatter.js'

// when we specify ! symbol then we tell typescript the element exists
const anchor=document.querySelector('a')!;
console.log(anchor.href)

//when we specify the type(eg:HTMLFormElement) using the as keyword, we get all the respective intellisense for that element
 const form=document.querySelector('.new-item-form') as HTMLFormElement;
//console.log(form.children);


 //inputs
 const type=document.querySelector('#type') as HTMLSelectElement;
 const tofrom=document.querySelector('#tofrom') as HTMLInputElement;
 const details=document.querySelector('#details') as HTMLInputElement;
 const amount=document.querySelector('#amount') as HTMLInputElement;
// list template instance
const ul=document.querySelector("ul")!;
// ListTempalte class where we pass the container ul to be created
const list=new ListTempalte(ul);

//  submit button
form.addEventListener('submit',(e:Event):void=>{
    e.preventDefault();
    //HasFormatter interface type
    let doc:HasFormatter;    
    if(type.value==='invoice'){
        // if ddl value is invoice
        doc=new Invoice(tofrom.value,details.value,amount.valueAsNumber);
    }else{
        // if ddl value is payment
        doc=new Payment(tofrom.value,details.value,amount.valueAsNumber);
    }
    // render the ul
    list.render(doc,type.value,'end')
    console.log('doc',doc);
})


 