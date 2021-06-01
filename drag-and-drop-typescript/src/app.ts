// Code goes here!
// Drag and Drop Interfaces
//we need 2 event handlers
interface Draggable{
    dragStartHandler(event:DragEvent):void;
    dragEndHandler(event:DragEvent):void;
}
//three event handlers are required
interface DragTarget{
    dragOverHandler(event:DragEvent):void;
    dropHandler(event:DragEvent):void;
    dragLeaveHandler(event:DragEvent):void;
}

enum ProjectStatus {Active, Finsihed}
// custom type using class so we can instantiate it
/***Project class ***/
class Project{    
    constructor(public id:string,public title:string,public description:string,public people:number,public status:ProjectStatus){    }
}
// custom type - function that receives items and does something with it
// return type is void, whoever passes a listener gets expects some items when listener fires
// we also don't know whether our listener will return an array of projects
// so for the function type we will need a generic type so we can set this from outside
type Listener<T>=(items:T[])=>void;
class State<T>{
    // listeners is for a subscription pattern,
    // listeners is an array of functions which will be called when something changes
    //we need to forward our generic type here
    protected listeners:Listener<T>[]=[];
   
    // add listener function
    addListener(listenerFn:Listener<T>){
        // push listener function to the listeners array
        this.listeners.push(listenerFn);
    }
}
/*** Project State management ***/ 
class ProjectState extends State<Project>{
   
    private projects:Project[]=[];
    // to access the this.instance inside the static method
    private static instance:ProjectState;

    private constructor(){
        super();
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
   

    // add project function
    addProject(title:string,description:string,numOfPeople:number){
        //Instantiate newProject using the class Project
        const newProject=new Project(Math.random().toString(),title,description,numOfPeople,ProjectStatus.Active);
        
        this.projects.push(newProject);
        //re-render project
        this.updateListeners();
    }

    // move project
    //project id and status will be received
    moveProject(projectId:string,newStatus:ProjectStatus){
        //find the project based on the id and flip the status
        const project=this.projects.find(prj=>prj.id===projectId);
        //change status only if project is present and projectStatus is different from existing status
        if(project&&project.status!==newStatus){
            project.status=newStatus;
            //re-render project
            this.updateListeners();
        }
    }
     //we call updateListeners when something changed about our project and we need a re-render
     // loop through all listeners when data changes
     private updateListeners(){
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
//***Component Base Class ***/ 
//UI user interface components which we render on the screen
// we use generics to specify the type of the element
//this class can only be inherited but never instantiated
// T & U is received from the inheriting child class
abstract class Component<T extends HTMLElement,U extends HTMLElement>{
 templateElement:HTMLTemplateElement;
 //hostElement-where we want to render something
 hostElement:T;
 //element we do render
 element:U;
 
 constructor(templateId:string,hostElementId:string,insertAtStart:boolean,newElementId?:string){
        //we pass the created template from index.html
        this.templateElement=document.getElementById(templateId)! as HTMLTemplateElement; 
        //the id we should append our html
        this.hostElement=document.getElementById(hostElementId)! as T;

         //we pass a pointer at your template element to the import node, 
        //.content is is a property that exists on HTML template element and it simply gives a reference to the content of a template.
        //(true) the second element specifies if we should take a deep clone or not 
        const importedNode=document.importNode(this.templateElement.content,true);
        console.log("importedNode--ProjectList",importedNode)
        // we store the first element in the imported template
        this.element=importedNode.firstElementChild as U;
        // we get the firstElementChild inside template#project-list which is section.projects 
        console.log("this.element--ProjectList",this.element)
        // add an id to the form - id is dynamic depending on the instantiated project ('active'|'finished')--only if it exists
        if(newElementId){
            this.element.id=newElementId;    
        }
        this.attach(insertAtStart);
 }
  // attach elements to dom - 
    private attach(insertAtBeginning:boolean){
        // if insertAtBeginning is true use afterbegin
        // beforeend - element must be inserted before closing tag of host element
        this.hostElement.insertAdjacentElement(insertAtBeginning?'afterbegin':'beforeend',this.element)
    }
    // abstract methods are added - complete implementation is missing here
    // we force any class inheriting the class to add these methods
    // private abstract methods are not supported so use public abstract methods
    abstract configure():void;
    abstract renderContent():void;
}
//***ProjectItem Class ***/ 
//set generic types for base class we are inheriting
//we will use this class to generate the individual the project list items
// when we implement the implements Draggable interface it forces us to implement two methods
class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable{
    private project:Project;
    // getter method to modify the text based on the number of people (i.e Persons or Person)
    // getter is accessed like a normal property (i.e this.persons)    
    get persons(){
        if(this.project.people===1){
            return '1 person'
        }else{
            return `${this.project.people} persons`
        }
    }

    //the id is not fixed it can be either active or finished 
    //1)hostId -we need to provide the id of the element where the project items should be rendered
    //2)project-data that will be rendered-we receive it in object form
    constructor(hostId:string,project:Project){
        //call the constructor of base class with following arguments
        //1)Template ID, 2)Host Element ID 3)position of insertion(beforeend,afterend) 4)potentially the id that must be assigned to new element        
        super('single-project',hostId,false,project.id);
        this.project=project
        // call abstract methods
        this.configure();
        this.renderContent();
    }  
    //interface Draggable methods
    dragStartHandler(event:DragEvent){
        console.log("dragStartHandler--event",event);
        // attach data to the drag event (we save the project id)
        event.dataTransfer!.setData("text/plain",this.project.id);
        // cursor appearance
        event.dataTransfer!.effectAllowed='move';
    }

    dragEndHandler(_:DragEvent){
        console.log("DragEnd");
    }

    //abstract methods
    configure(){
        // "this" keyword must point to this class
        this.element.addEventListener('dragstart',this.dragStartHandler.bind(this));
        this.element.addEventListener('dragend',this.dragEndHandler.bind(this));
    }  
    renderContent(){
        // reach out to the elements in renderContent 
        this.element.querySelector('h2')!.textContent=this.project.title;
        // this.element.querySelector('h3')!.textContent=this.project.people.toString()+' assigned';
        //using getter
        this.element.querySelector('h3')!.textContent=this.persons+' assigned';
        this.element.querySelector('p')!.textContent=this.project.description;
    }
}

//***ProjectList Class***/
//set generic types for base class we are inheriting-<HTMLDivElement,HTMLElement>
class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget{   
    assignedProjects:Project[];
    // the type of the project should be 'active'|'finished'
    // we must get this type when the project is instantiated
    constructor(private type:'active'|'finished'){
        //call the constructor of base class with following arguments
        //1)Template ID, 2)Host Element ID 3)position of insertion(beforeend,afterend) 4)potentially the id that must be assigned to new element
        super('project-list','app',false,`${type}-projects`);
        // initialize assignedProjects
        this.assignedProjects=[]    
        //call the configure method
        this.configure();
        // render list to dom()       
        this.renderContent();
    }
    // implememt DragTarget interface methods
    //fires when we drag a valid draggable target
    @autobind
    dragOverHandler(event:DragEvent){
        //is data attached to our drag event of the format 
        //this is the type we set in dragStartHandler in ProjectItem class 
        if(event.dataTransfer && event.dataTransfer.types[0]==="text/plain"){
            //default for js events is to prevent drops, so we need to execute the event.preventDefault();
            event.preventDefault();
            const listEl=this.element.querySelector('ul');
            listEl?.classList.add('droppable');
        }
       
    }
     //@autobind
    dropHandler(event:DragEvent){
        console.log("dropHandler-event",event.dataTransfer!.getData('text/plain'));
        const prjId=event.dataTransfer!.getData('text/plain');
        //do re-render - 1)pass the project id 2)the status
        //set the ProjectStatus.Active||ProjectStatus.Finished based on enum        
        projectState.moveProject(prjId,this.type==="active"?ProjectStatus.Active:ProjectStatus.Finsihed)
    }
    //when we leave this element with a dragged element
    @autobind
    dragLeaveHandler(_:DragEvent){
        const listEl=this.element.querySelector('ul');
        listEl?.classList.remove('droppable');

    }

    // implement abstract method
    configure(){
        // implement drag events
        this.element.addEventListener('dragover',this.dragOverHandler);
        this.element.addEventListener('dragleave',this.dragLeaveHandler);
        //configure the bind method to calling class or specify the autobind function
        this.element.addEventListener('drop',this.dropHandler.bind(this));

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
    }
    // add text to header inside template#project-list
    renderContent(){
      const listId=`${this.type}-project-list`;
      // search the template and add an id for the ul
      this.element.querySelector('ul')!.id=listId;
      //   add a header for the template
      this.element.querySelector('h2')!.textContent=this.type.toUpperCase()+' PROJECTS';
    }
    // render projects based on input submuit
    private renderProjects(){
        // get id of the list element
        const listEl=document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.innerHTML='';
        //render listItem based on form input and attach to the ul
        for(const prjItem of this.assignedProjects){
            // const listItem=document.createElement('li');
            // listItem.textContent=prjItem.title;
            // listEl.appendChild(listItem)  
            // Instead of manually creating the project list item we will use the ProjectItem class
            //we pass the 1)id of the host element 2)prjItem-constant we get in loop
            new ProjectItem(this.element.querySelector('ul')!.id,prjItem)
        }
    }
   
}


//***Project Input Class***/ 
class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{   
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
// instantiate the class
const prjInput = new ProjectInput();
// instantiate the list
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');