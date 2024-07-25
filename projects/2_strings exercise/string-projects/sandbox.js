const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Blah Blah Blah"));
    console.log("Promise called");
  }, 3000);
});

myPromise
  .then((result) => {
    console.log("myPromise called", result);
  })
  .catch((error) => {
    console.log("error", error);
  });
