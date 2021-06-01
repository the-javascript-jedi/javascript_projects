// autobind decorator - to  bind the this keyword with the calling method
//alternatively use this.submitHandler.bind(this) or an arrow function
//specify "_" infront of variable if it is not used _target
export function autobind(_target:any,_methodName:string,descriptor:PropertyDescriptor){
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
