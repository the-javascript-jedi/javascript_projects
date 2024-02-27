import { HasFormatter } from "../interfaces/HasFormatter.js";

export class ListTempalte{
    constructor(private container:HTMLUListElement){

    }

    render(item:HasFormatter,heading:string,pos:'start'|'end'){
        const li=document.createElement('li');
        const h4=document.createElement('h4');
        h4.innerHTML=heading;
        li.append(h4);

        const p=document.createElement('p');
        p.innerText=item.format();
        li.append(p);

        // insert based on passed position
        if(pos==="start"){
            this.container.prepend(li);
        }else{
            this.container.append(li);
        }
    }
}