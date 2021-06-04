console.log("ts file loaded...");
// classes
class Invoice{
    client:string;
    private details:string;;
    private amount:number;

    constructor(c:string,d:string,a:number){
        this.client=c;
        this.details=d;
        this.amount=a;
    }

    format(){
        return `${this.client} owes $${this.amount} for ${this.details}`
    }
}

// instantiate the class  //pass the constructor values
const invOne=new Invoice('mario','works on the mario website',250);
const invTwo=new Invoice('luigi','works on the mario website',300);

// create an array of type invoices
let invoices:Invoice[]=[];
invoices.push(invOne);
invoices.push(invTwo);

console.log('invoices array',invoices);

//execute the function inside the array
invoices.forEach((inv):void=>{
    console.log("inv.format()-",inv.format())
})

// when we specify ! symbol then we tell typescript the element exists
const anchor=document.querySelector('a')!;
console.log(anchor.href)

//when we specify the type(eg:HTMLFormElement) using the as keyword, we get all the respective intellisense for that element
 const form=document.querySelector('.new-item-form') as HTMLFormElement;
//  console.log(form.children);


 //inputs
 const type=document.querySelector('#type') as HTMLSelectElement;
 const tofrom=document.querySelector('#tofrom') as HTMLInputElement;
 const details=document.querySelector('#details') as HTMLInputElement;
 const amount=document.querySelector('#amount') as HTMLInputElement;

form.addEventListener('submit',(e:Event):void=>{
    e.preventDefault();
    console.log('form-submission',type.value,tofrom.value,details.value,amount.valueAsNumber)
})


 