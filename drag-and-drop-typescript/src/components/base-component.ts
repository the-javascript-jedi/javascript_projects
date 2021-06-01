//***Component Base Class ***/ 
//UI user interface components which we render on the screen
// we use generics to specify the type of the element
//this class can only be inherited but never instantiated
// T & U is received from the inheriting child class
export abstract class Component<T extends HTMLElement,U extends HTMLElement>{
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