(function () {
  var counter = 0;

  function increment() {
    counter++;
    console.log("counter", counter);
  }

  increment();
  increment();
})();

// call apply bind

function greet(greeting) {
  console.log(greeting + "" + this.name);
}

const person = {
  name: "test",
};

greet.apply(person, ["hello"]);
