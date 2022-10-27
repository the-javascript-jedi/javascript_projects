const swapi = function (num) {
  let url = "https://swapi.dev/api/people/";
  // fetch will return a promise
  fetch(url + num + "/")
    .then((data) => data.json())
    .then((obj) => {
        console.log("obj", obj)
        return fetch(obj.homeworld)
    }).then(hwData=>hwData.json()).then(hwObj=>console.log("hwObj",hwObj));
};
swapi(1);
