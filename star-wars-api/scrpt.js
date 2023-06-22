const swapi = function (num) {
  let url = "https://swapi.dev/api/people/";
  // fetch will return a promise
  fetch(url + num + "/")
    .then((data) => data.json())
    .then((obj) => {
      console.log("obj", obj);
      return fetch(obj.homeworld);
    })
    .then((hwData) => hwData.json())
    .then((hwObj) => console.log("hwObj", hwObj));
};
swapi(1);
const token =
  "fba012a2a0c9c3d884fdf15843f2aa438bac1b5e8527875ecd7187e3ce494158";

fetch("http://127.0.0.1:8001/user/", {
  mode: "cors",
  cache: "no-cache",
  credentials: "include",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huIiwiZXhwIjoxNjg3NDA3MzkwfQ.nYN_jJZRl5iMKUlElp9vacKA-6uzLId-IoBymfQTf7k`,
    "X-Custom-Header": "header value",
  },
})
  .then((resp) => resp.json())
  .then((json) => console.log(JSON.stringify(json)));
