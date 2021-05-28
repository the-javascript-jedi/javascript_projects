// Code goes here!
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
    // submit form event handler with autobind decorator
    @autobind
    private submitHandler(event:Event){
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }   
    private configure(){
        // we need to bind "this" keyword with the submit context 
        this.element.addEventListener('submit',this.submitHandler.bind(this));
        this.element.addEventListener('submit',this.submitHandler.bind(this))
    }

    // attach to div#app
    private attach(){
        // afterbegin describes where the element must be inserted
        this.hostElement.insertAdjacentElement('afterbegin',this.element)
    }
}
// instantiate the class
const prjInput = new ProjectInput();