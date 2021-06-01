namespace App{
  export interface Validatable{
    // values other than value are optional-specified using ? symbol
    value:string|number;
    required?:boolean;
    minLength?:number;
    maxLength?:number;
    min?:number;
    max?:number;
}

export function validate(validatableInput:Validatable){
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
}
