/// <reference path="base-component.ts"/>
namespace App{
    //***Project Input Class***/ 
export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{   
    titleInputElement:HTMLInputElement;
    descriptionInputElement:HTMLInputElement;
    peopleInputElement:HTMLInputElement;
    constructor(){ 
        //call the constructor of base class with following arguments
        //1)Template ID, 2)Host Element ID 3)position of insertion(beforeend,afterend) 4)potentially the id that must be assigned to new element
        super('project-input','app',true,'user-input');        
        // select input elements inside the template
        this.titleInputElement=this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement=this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement=this.element.querySelector("#people") as HTMLInputElement;   
        // configure the submit event
        this.configure(); 
        // added to satisfy abstract base class
        this.renderContent();  
    }   
    configure(){       
        // we need to bind "this" keyword with the submit context 
        this.element.addEventListener('submit',this.submitHandler);        
    } 
    // added to satisfy abstract base class
    renderContent(){}
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
            // pass the values to projectState
            projectState.addProject(title,desc,people);
            // clear inputs
            this.clearInputs();
        }

    }   
  
    }
}