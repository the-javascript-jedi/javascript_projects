import {Project,ProjectStatus} from '../models/project-model.js';

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
export class ProjectState extends State<Project>{
   
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
export const projectState=ProjectState.getInstance();
