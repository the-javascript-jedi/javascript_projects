namespace App{
    export enum ProjectStatus {Active, Finsihed}
    // custom type using class so we can instantiate it
    /***Project class ***/
    export class Project{    
        constructor(public id:string,public title:string,public description:string,public people:number,public status:ProjectStatus){    }
    }
}