"use strict";

const asyncFun = async function () {
  //using the await will make the execution to pause here until promise is resolved
  let p1 = await asyncFunction();
  console.log(p1);
  console.log(`${p1}-more info`);
};

asyncFun();
