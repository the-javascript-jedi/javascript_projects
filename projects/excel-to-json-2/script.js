console.log("loaded script");
// Method to upload a valid excel file
function upload() {
  var files = document.getElementById("file_upload").files;
  if (files.length == 0) {
    alert("Please choose any file...");
    return;
  }
  var filename = files[0].name;
  var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
  if (extension == ".XLS" || extension == ".XLSX") {
    excelFileToJSON(files[0]);
  } else {
    alert("Please select a valid excel file.");
  }
}

//Method to read excel file and convert it into JSON
function excelFileToJSON(file) {
  try {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      var result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      console.log("result", result);
      //displaying the json result
      //   var resultEle = document.getElementById("json-result");
      //   resultEle.value = JSON.stringify(result, null, 4);
      //   resultEle.style.display = "block";

      let table = generateTable(result.Sheet1);
      document.body.appendChild(table);
    };
  } catch (e) {
    console.error(e);
  }
}

function generateTable(data) {
  console.log("generateTable-data", data);
  // Create table element
  let table = document.createElement("table");

  // Create table header row
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  Object.keys(data[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  let tbody = document.createElement("tbody");
  data.forEach((obj) => {
    let tr = document.createElement("tr");
    Object.values(obj).forEach((value) => {
      let td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}
