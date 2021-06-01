namespace App{
    //***ProjectList Class***/
//set generic types for base class we are inheriting-<HTMLDivElement,HTMLElement>
export class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget{   
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
}