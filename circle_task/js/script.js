console.log("script loaded!!!");

data_chart_1 = {
  datasets: [
    {
      data: [45, 55],
      backgroundColor: ["f1f1f1", "#ffcc00"],
      borderColor: ["white", "white"],
      borderWidth: 1,
    },
    {
      data: [30, 70],
      backgroundColor: ["f1f1f1", "#f1e6bf"],
      borderColor: ["white", "white"],
      borderWidth: 1,
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
    "proportion of patients achieving 12 week dosing at 96 weeks",
    "proportion of patients not achieving 12 week dosing at 96 weeks",
  ],
};
data_chart_2 = {
  datasets: [
    {
      data: [45, 55],
      backgroundColor: ["f1f1f1", "#ffcc00"],
      borderColor: ["white", "white"],
      borderWidth: 1,
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
    "proportion of patients achieving 16 week dosing at 96 weeks",
    "proportion of patients not achieving 16 week dosing at 96 weeks",
  ],
};
var ctx_1 = document.getElementById("myChart-1").getContext("2d");
var ctx_2 = document.getElementById("myChart-2").getContext("2d");

function callChart1() {
  var myDoughnutChart = new Chart(ctx_1, {
    type: "doughnut",
    data: data_chart_1,
    options: {
      legend: {
        display: false,
      },
    },
  });
}

function callChart2() {
  var myDoughnutChart = new Chart(ctx_2, {
    type: "doughnut",
    data: data_chart_2,
    options: {
      legend: {
        display: false,
      },
    },
  });
}

// events
$(document).ready(function () {
  callChart1();
  callChart2();
  $("#fourweek").on("click", function () {
    $("#fourweek").removeClass("btn-inactive").addClass("btn-primary");
    $("#twoweek").removeClass("btn-secondary").addClass("btn-inactive");
    $("#quantity").text("1-3,9");
    callChart1();
    callChart2();
  });
  $("#twoweek").on("click", function () {
    $("#twoweek").removeClass("btn-inactive").addClass("btn-secondary");
    $("#fourweek").removeClass("btn-primary").addClass("btn-inactive");
    $("#quantity").text("1,2,9");
    callChart1();
    callChart2();
  });
});
