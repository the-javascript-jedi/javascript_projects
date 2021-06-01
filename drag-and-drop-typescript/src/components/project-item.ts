
import {Draggable} from '../models/drag-drop-interfaces.js';
import {Project} from '../models/project-model.js';
import {Component} from './base-component.js'

//***ProjectItem Class ***/ 
//set generic types for base class we are inheriting
//we will use this class to generate the individual the project list items
// when we implement the implements Draggable interface it forces us to implement two methods
export class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable{
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
