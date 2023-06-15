console.log("loaded script");
var file = [
  {
    productFamily: "Cisco Aironet 1200 Series",
    Risk_Rank: "LOW",
    "0_5": 20,
    "5_10": 8,
    "10_15": 1,
    "15_20": 11,
    "20_25": 1,
    "25_30": 1,
    "30_35": 1,
    deviceLabel: "30_35",
  },
  {
    productFamily: "Cisco Aironet 1200 Series",
    Risk_Rank: "MED",
    "55_60": 20,
    "60_65": 8,
    "70_75": 1,
    "80_85": 11,
    "85_90": 1,
  },
];
// var file = [
//   {
//     productFamily: "Cisco Catalyst 8300 Series Edge Platform",
//     Risk_Rank: "HIGH",
//     "95_100": 5,
//   },
//   {
//     productFamily: "Cisco Catalyst 8300 Series Edge Platform",
//     Risk_Rank: "LOW",
//     "0_5": 101,
//     "5_10": 131,
//     "10_15": 174,
//     "15_20": 224,
//     "20_25": 235,
//     "25_30": 97,
//     "30_35": 38,
//     "35_40": 44,
//     "40_45": 27,
//     "45_50": 11,
//   },
//   {
//     productFamily: "Cisco Catalyst 8300 Series Edge Platform",
//     Risk_Rank: "MED",
//     "50_55": 101,
//     "5_10": 131,
//     "55_60": 174,
//     "60_65": 224,
//     "65_70": 235,
//     "75_80": 97,
//     "80_85": 38,
//     "85_90": 44,
//     "90_95": 27,
//     deviceLabel: "90_95",
//   },
// ];

var filteredArray = [];
var resultArray = [];
var sortedFilteredArray = [];
var finalDevicePercentage = "";
// loop over the source Raw array
file.forEach((fileVal) => {
  // console.log("fileVal", fileVal);
  let productFamilyKey;
  let riskRankKey;
  let deviceLabel;

  Object.entries(fileVal).forEach(([key, value]) => {
    if (key == "Risk_Rank") {
      riskRankKey = value;
    }
    if (key == "productFamily") {
      productFamilyKey = value;
    }
    if (key == "deviceLabel" && key != undefined) {
      deviceLabel = value;
      finalDevicePercentage = value;
    }
  });

  for (const [key, value] of Object.entries(fileVal)) {
    var customObj = {};
    customObj["percentage"] = key;
    customObj["noOfDevices"] = value;
    customObj["productFamilyKey"] = productFamilyKey;
    customObj["riskRankKey"] = riskRankKey;
    customObj["deviceLabel"] = deviceLabel;
    resultArray.push(customObj);
  }
  // remove unneccessary key
  filteredArray = resultArray.map((val) => {
    if (
      val.percentage !== "productFamily" &&
      val.percentage !== "Risk_Rank" &&
      val.percentage !== "deviceLabel"
    ) {
      return val;
    }
  });
  // remove undefined values from array
  filteredArray = filteredArray.filter(function (element) {
    return element !== undefined;
  });

  // sort the array based on priority
  var priorityArray = ["LOW", "MED", "HIGH"];
  var filteredArraySlice = filteredArray.slice();
  sortedFilteredArray = filteredArraySlice.sort(function (a, b) {
    var firstPrio = priorityArray.indexOf(a.riskRankKey);
    var secPrio = priorityArray.indexOf(b.riskRankKey);
    return firstPrio - secPrio;
  });
});
console.log("sortedFilteredArray", sortedFilteredArray);
indexDevicePercentage = sortedFilteredArray.findIndex(
  (element) => element.percentage === finalDevicePercentage
);
console.log("indexDevicePercentage", indexDevicePercentage);
