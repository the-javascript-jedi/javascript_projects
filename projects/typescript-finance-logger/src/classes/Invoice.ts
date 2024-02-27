import { HasFormatter } from '../interfaces/HasFormatter.js'
// classes
export class Invoice implements HasFormatter{
    client:string;
    private details:string;;
    private amount:number;

    constructor(c:string,d:string,a:number){
        this.client=c;
        this.details=d;
        this.amount=a;
    }

    format(){
        return `${this.client} owes $${this.amount} for ${this.details}`
    }
}