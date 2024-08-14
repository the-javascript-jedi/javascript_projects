const person = {
  name: "testUser",
};
function greet(greeting) {
  console.log(greeting + " " + this.name);
}
//call
greet.call(person, "hello call");

//apply
greet.apply(person, ["hello apply"]);

let bindFunc = greet.bind(person, "hello bind");
bindFunc();
