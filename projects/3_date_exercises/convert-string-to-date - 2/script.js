console.log("script loaded");
var reponseArray = [
  {
    cpykey_deviceid: 1,
    Risk_Rank: "MED",
    dumpdata: "2023-08-20",
  },
  {
    cpykey_deviceid: 2,
    Risk_Rank: "MED",
    dumpdata: "2022-01-08",
  },
];

reponseArray.forEach(function (res) {
  console.log("res.dumpdata", res.dumpdata);
  res.dumpdata = dayjs(res.dumpdata).format("DD MMM YYYY"); // '25/01/2019'
});
console.log("reponseArray", reponseArray);
