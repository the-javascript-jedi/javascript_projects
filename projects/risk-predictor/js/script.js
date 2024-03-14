console.log("loaded script!!!");
// api present in \angular_projects\angular-cases-examples\1-table-projects\table-horizontal-bar-graph\server\index.js
var predictionPayload = {
  productId: "",
  type: "",
  air_temp: "",
  process_temp: "",
  rot_speed: "",
  torgue: "",
  toolwear: "",
  twf: "",
  hdf: "",
  pwf: "",
  osf: "",
  rnf: "",
};
document
  .querySelector("#predict-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    resetData();
    predictionPayload.productId = e.target.elements.productId.value;
    predictionPayload.type = e.target.elements.type.value;
    predictionPayload.air_temp = e.target.elements.air_temp.value;
    predictionPayload.process_temp = e.target.elements.process_temp.value;
    predictionPayload.rot_speed = e.target.elements.rot_speed.value;
    predictionPayload.torgue = e.target.elements.torgue.value;
    predictionPayload.toolwear = e.target.elements.toolwear.value;
    predictionPayload.twf = e.target.elements.twf.value;
    predictionPayload.hdf = e.target.elements.hdf.value;
    predictionPayload.pwf = e.target.elements.pwf.value;
    predictionPayload.osf = e.target.elements.osf.value;
    predictionPayload.rnf = e.target.elements.rnf.value;
    console.log("predictionPayload", predictionPayload);
    //   make api call
    postDataForPrediction("http://localhost:5000/predict", predictionPayload)
      .then((response) => {
        console.log("response", response); // JSON data parsed by `data.json()` call
        document.querySelector("#machine_status").textContent =
          response.machine_status;
        if (response.machine_status == "SUCCESS") {
          document
            .querySelector("#machine_status")
            .classList.remove("bg-danger");
          document.querySelector("#machine_status").classList.add("bg-success");
          document
            .querySelector("#recommendSection")
            .classList.remove("d-flex");
          document.querySelector("#recommendSection").classList.add("d-none");
        }
        if (response.machine_status == "FAILURE") {
          document
            .querySelector("#machine_status")
            .classList.remove("bg-success");
          document.querySelector("#machine_status").classList.add("bg-danger");
          document
            .querySelector("#recommendSection")
            .classList.remove("d-none");
          document.querySelector("#recommendSection").classList.add("d-flex");
        }
      })
      .catch((error) => {
        console.error("Error while making the request:", error);
      });
  });

async function postDataForPrediction(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle non-200 status codes (e.g., 404, 500, etc.)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle any other errors (network issues, invalid JSON, etc.)
    console.error("An error occurred:", error.message);
    // You can choose to return an error object or handle it differently
    throw error;
  }
}

async function getDataForPrediction(url = "") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data received successfully:", data);
    return data;
    // Handle the data as needed (e.g., display it on the page)
  } catch (error) {
    console.error("Error while fetching data:", error.message);
    throw error;
  }
}
document.querySelector("#btnRecommend").addEventListener("click", function (e) {
  getDataForPrediction("http://localhost:5000/recommendations")
    .then((data) => {
      document
        .querySelector("#recommendations_result")
        .classList.remove("d-none");
      document
        .querySelector("#recommendations_result")
        .classList.add("d-block");
      console.log("get request", data);
      document.querySelector("#txtAreaLlmResults").value =
        data.recommendations.llmResult;
      document.querySelector("#txtAreaRecommend").value =
        data.recommendations.recommendations;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

function resetData() {
  document.querySelector("#recommendSection").classList.remove("d-block");
  document.querySelector("#recommendSection").classList.add("d-none");
  document.querySelector("#recommendations_result").classList.remove("d-block");
  document.querySelector("#recommendations_result").classList.add("d-none");
  document.querySelector("#txtAreaLlmResults").value = "";
  document.querySelector("#txtAreaRecommend").value = "";
}
