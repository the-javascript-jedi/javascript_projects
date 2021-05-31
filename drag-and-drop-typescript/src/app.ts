// Code goes here!
enum ProjectStatus {Active, Finsihed}
// custom type using class so we can instantiate it
class Project{    
    constructor(public id:string,public title:string,public description:string,public people:number,public status:ProjectStatus){

    }
}
// custom type - function that receives items and does something with it
// return type is void, whoever passes a listener gets expects some items when listener fires
type Listener=(items:Project[])=>void;

// Project State management
class ProjectState{
    // listeners is for a subscription pattern,
    // listeners is an array of functions which will be called when something changes
    private listeners:Listener[]=[]
    private projects:Project[]=[];
    // to access the this.instance inside the static method
    private static instance:ProjectState;

    private constructor(){

    }
    // getInstance - static method to check if this.instance is a thing
    // return this.instancer if it exists else create an instance
    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        this.instance=new ProjectState();
        return this.instance;
    }
    // add listener function
    addListener(listenerFn:Listener){
        // push listener function to the listeners array
        this.listeners.push(listenerFn);
    }

    // add project function
    addProject(title:string,description:string,numOfPeople:number){
        //Instantiate newProject using the class Project
        const newProject=new Project(Math.random().toString(),title,description,numOfPeople,ProjectStatus.Active);
        
        this.projects.push(newProject);
        // loop through all listeners when data changes
        for(const listenerFn of this.listeners){
            // pass what is relevant to listener function
            // pass a copy of the array using slice
            listenerFn(this.projects.slice());
        }
    }

}
// only one object of instance will be needed for state management- static method 
const projectState=ProjectState.getInstance();
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
// ProjectList Class
class ProjectList{
    templateElement:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    element:HTMLElement;
    assignedProjects:Project[];
    // the type of the project should be 'active'|'finished'
    // we must get this type when the project is instantiated
    constructor(private type:'active'|'finished'){
        // initialize assignedProjects
        this.assignedProjects=[]
        //we pass the created template from index.html
        this.templateElement=document.getElementById('project-list')! as HTMLTemplateElement; 
        //the id we should append our html
        this.hostElement=document.getElementById('app')! as HTMLDivElement;
        //we pass a pointer at your template element to the import node, 
        //.content is is a property that exists on HTML template element and it simply gives a reference to the content of a template.
        //(true) the second element specifies if we should take a deep clone or not 
        const importedNode=document.importNode(this.templateElement.content,true);
        console.log("importedNode--ProjectList",importedNode)
        // we store the first element in the imported template
        this.element=importedNode.firstElementChild as HTMLElement;
        // we get the firstElementChild inside template#project-list which is section.projects 
        console.log("this.element--ProjectList",this.element)
        // add an id to the form - id is dynamic depending on the instantiated project ('active'|'finished')
        this.element.id=`${this.type}-projects`;    
        // register a listener function - we need to pass a function to addListener function
        //projects is received from projectState
        projectState.addListener((projects:Project[])=>{
            // filter the array based on the active|inactive class
            const relevantProjects=projects.filter(prj=>{
                if(this.type==='active'){
                    return prj.status===ProjectStatus.Active;
                }else{
                    return prj.status===ProjectStatus.Finsihed;
                }
            })
            this.assignedProjects=relevantProjects;
            this.renderProjects();
        })
        
        // attach element/render list to dom() 
        this.attach();        
        this.renderContent();
    }
    // render projects based on input submuit
    private renderProjects(){
        // get id of the list element
        const listEl=document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.innerHTML='';
        //render listItem based on form input and attach to the ul
        for(const prjItem of this.assignedProjects){
            const listItem=document.createElement('li');
            listItem.textContent=prjItem.title;
            listEl.appendChild(listItem)  
        }
    }

    // add text to header inside template#project-list
    private renderContent(){
      const listId=`${this.type}-project-list`;
      // search the template and add an id for the ul
      this.element.querySelector('ul')!.id=listId;
      //   add a header for the template
      this.element.querySelector('h2')!.textContent=this.type.toUpperCase()+' PROJECTS';
    }

    // attach elements to dom - 
    private attach(){
        // beforeend - element must be inserted before closing tag of host element
        this.hostElement.insertAdjacentElement('beforeend',this.element)
    }

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
        console.log("importedNode--ProjectInput",importedNode)
        this.element=importedNode.firstElementChild as HTMLFormElement;
        // we get the firstElementChild inside template which is a form 
        console.log("this.element-ProjectInput",this.element)
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
            // pass the values to projectState
            projectState.addProject(title,desc,people);
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
// instantiate the list
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');