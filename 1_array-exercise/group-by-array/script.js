console.log("script loaded");
let dummy_data = [
  {
    cdets_id: "CSCvu03609",
    cdets_link: "CSCvu03609.com",
    cdets_title: "CSCvu03609 title",
    sr_data: [
      {
        last_updated: "2021",
        match_percentage: "95.43",
        sr_id: "6919869",
        sr_link: "6919869.com",
      },
    ],
  },
  {
    cdets_id: "CSCvu03609",
    cdets_link: "CSCvu03609.com",
    cdets_title: "CSCvu03609 title",
    sr_data: [
      {
        last_updated: "2022",
        match_percentage: "95.43",
        sr_id: "6919869",
        sr_link: "6919869.com",
      },
    ],
  },
  {
    cdets_id: "CSCvx23125",
    cdets_link: "CSCvx23125.com",
    cdets_title: "CSCvx23125 title",
    sr_data: [
      {
        last_updated: "2022",
        match_percentage: "90.43",
        sr_id: "987456312",
        sr_link: "987456312.com",
      },
    ],
  },
  {
    cdets_id: "CSCvr77861",
    cdets_link: "CSCvr77861.com",
    cdets_title: "CSCvr77861 title",
    sr_data: [
      {
        last_updated: "2020",
        match_percentage: "92",
        sr_id: "852147",
        sr_link: "852147.com",
      },
    ],
  },
  {
    cdets_id: "CSCvr77861",
    cdets_link: "CSCvr77861.com",
    cdets_title: "CSCvr77861 title",
    sr_data: [
      {
        last_updated: "2018",
        match_percentage: "82",
        sr_id: "852147",
        sr_link: "852147.com",
      },
    ],
  },
];
// expected output
/*
by_cdets_id:[
    {cdets_id:1,cdets_link:'link',sr_data:[
        {match_percentage:100,last_updated:2000,sr_id:1},
        {match_percentage:95,last_updated:2002,sr_id:2},
    ]}
] */
console.log("dummy_data", dummy_data);
const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};
const groupedData = groupBy(dummy_data, "cdets_id");
console.log("groupedData", groupedData);

var resultArray = [];
for (const [key, value] of Object.entries(groupedData)) {
  var customObj = {};
  //   customObj["cdets_id"] = key;
  customObj["cdets_id"] = key;
  customObj["cdets_link"] = value[0].cdets_link;
  customObj["sr_all_data"] = value.map((val) => val.sr_data).flat(); //flatten the array of arrays
  resultArray.push(customObj);
}

console.log("resultArray", resultArray);
