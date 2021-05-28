// Code goes here!
interface Validatable{
    // values other than value are optional-specified using ? symbol
    value:string|number;
    required?:boolean;
    minLength?:number;
    maxLength?:number;
    min?:number;
    max?:number;
}

function validate(validatableInput:Validatable){
    let isValid=true;
    if(validatableInput.required){
        // we set isValid to false if the passed input value is empty
        //isValid=isValid++(true||false)-based on condition
        isValid=isValid&&validatableInput.value.toString().trim().length!==0;
    }
    // minLength check
    // do a check only if the value is a string and we need to check a min length
    if(validatableInput.minLength!=null&&typeof validatableInput.value==="string"){
        isValid=isValid&&validatableInput.value.length >= validatableInput.minLength;
    }
    // maxLength check
    // do a check only if the value is a string and we need to check a max length
    if(validatableInput.maxLength!=null&&typeof validatableInput.value==="string"){
        isValid=isValid&&validatableInput.value.length <= validatableInput.maxLength;
    }
    // check min of number
    if(validatableInput.min!=null&&typeof validatableInput.value==="number"){
        isValid=isValid&&validatableInput.value >= validatableInput.min;
    }
    // check max of number
    if(validatableInput.max!=null&&typeof validatableInput.value==="number"){
        isValid=isValid&&validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// autobind decorator - to  bind the this keyword with the calling method
//alternatively use this.submitHandler.bind(this) or an arrow function
//specify "_" infront of variable if it is not used _target
function autobind(_target:any,_methodName:string,descriptor:PropertyDescriptor){
    const originalMethod=descriptor.value;
    const adjDescriptor:PropertyDescriptor={
        configurable:true,
        get(){
           const boundFn=originalMethod.bind(this);
           return boundFn;
        }   
    }
    return adjDescriptor;
}

// Project Input Class
class ProjectInput{
    templateElement:HTMLTemplateElement; //template id="project-input"
    hostElement:HTMLDivElement; //div id="app"
    element:HTMLFormElement; //form element from template in index.html
    titleInputElement:HTMLInputElement;
    descriptionInputElement:HTMLInputElement;
    peopleInputElement:HTMLInputElement;
    constructor(){        
        //we pass the created template from index.html
        this.templateElement=document.getElementById('project-input')! as HTMLTemplateElement; 
        //the id we should append our html
        this.hostElement=document.getElementById('app')! as HTMLDivElement;
        //we pass a pointer at your template element to the import node, 
        //.content is is a property that exists on HTML template element and it simply gives a reference to the content of a template.
        //(true) the second element specifies if we should take a deep clone or not 
        const importedNode=document.importNode(this.templateElement.content,true);
        console.log("importedNode",importedNode)
        this.element=importedNode.firstElementChild as HTMLFormElement;
        // we get the firstElementChild inside template which is a form 
        console.log("this.element",this.element)
        // add an id to the form
        this.element.id="user-input";
        // select input elements inside the template
        this.titleInputElement=this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement=this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement=this.element.querySelector("#people") as HTMLInputElement;
        // configure the submit event
        this.configure();
        // attach element  
        this.attach();        
    }    
    // private method to gather user input -- private method can be called from only inside the class
    private gatherUserInput():[string,string,number]|void{
        const enteredTitle=this.titleInputElement.value;
        const enteredDescription=this.descriptionInputElement.value;
        const enteredPeople=this.peopleInputElement.value;
        // create a common validatable object
        // check title value
        const titleValidatable:Validatable={
            value:enteredTitle,
            required:true
        };
        // check description value
        const descriptionValidatable:Validatable={
            value:enteredDescription,
            required:true,
            minLength:5
        };
        // check people value
        const peopleValidatable:Validatable={
            // convert enteredPeople to number
            value:+enteredPeople,
            required:true,
            min:1,
            max:5
        };

        // do validation of input elements using the Validatable
        //if atleast one of the validate functions are false we need to display the validation message so we use "!"" symbol
        if(!validate(titleValidatable)||!validate(descriptionValidatable)||!validate(peopleValidatable)){
            alert("Invalid input, please try again");
            // return void for an error
            return;
        }else{
            //return a tuple (parse enteredPeople as a number using +symbol)
            return [enteredTitle,enteredDescription,+enteredPeople]
        }
    }
    // clear inputs
    private clearInputs(){
        this.titleInputElement.value="";
        this.descriptionInputElement.value="";
        this.peopleInputElement.value="";
    }

    // submit form event handler with autobind decorator
    @autobind
    private submitHandler(event:Event){
        event.preventDefault();
        // gather user input
        const userInput=this.gatherUserInput();
        // check for tuple
        if(Array.isArray(userInput)){
            const [title,desc,people]=userInput;
            console.log("title,desc,people---",title,desc,people);
            // clear inputs
            this.clearInputs();
        }

    }   
    private configure(){
        // we need to bind "this" keyword with the submit context 
        this.element.addEventListener('submit',this.submitHandler);        
    }

    // attach to div#app
    private attach(){
        // afterbegin describes where the element must be inserted
        this.hostElement.insertAdjacentElement('afterbegin',this.element)
    }
}
// instantiate the class
const prjInput = new ProjectInput();