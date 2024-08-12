interface Person{
    name:string;
    age:number;
}

function createPerson(name:string,age:number):Person{
    const person:Person={
        name:this.name,
        age:this.age,
    }
      console.log("Person Created:", person);
    return person;
}

createPerson('name',23)