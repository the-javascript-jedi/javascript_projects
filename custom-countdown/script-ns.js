const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
let countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");

// returns an array of spans
const timeElements = document.querySelectorAll("span");
const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countDownDate;
let savedCountDown;
console.log("Moment", moment().format("MMM D, YYYY h:mm:ss"));
//O/P - Moment Apr 10, 2021 12:47:44

// Populate Countdown/Complete UI
function updateDOM(countDownDate) {
  console.log("countDownDate--updateDOM", countDownDate);
  countdownActive = setInterval(() => {
    // Get today's date and time
    var now = new Date().getTime();
    var countDownDateConverted = new Date(countDownDate).getTime();
    // Find the distance between now and the count down date
    var distance = countDownDateConverted - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hide Input
    inputContainer.hidden = true;
    // Show Countdown
    countdownEl.hidden = false;
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownElTitle} finished on ${countDownDate}`;
      completeEl.hidden = false;
    } else {
      // Show the countdown in progress
      console.log(days, hours, minutes, seconds);
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, 1000);
}
// Set Date Input Min with Today's Date
// set the date to not accept past dates
// console.log("today for min", moment(new Date()).format("YYYY-MMM-DD"));
var todayFromMoment = moment(new Date()).format("YYYY-MM-DD");
console.log("todayFromMoment", todayFromMoment); //2021-04-10
dateEl.setAttribute("min", todayFromMoment);
// Take values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownElTitle = e.srcElement[0].value;
  countdownDateFromForm = e.srcElement[1].value;
  // console.log("countdownDate", countdownDateFromForm);
  var countDownDate = moment(countdownDateFromForm).format("MMM D, YYYY");
  savedCountDown = {
    title: countdownElTitle,
    date: countdownDateFromForm,
  };
  console.log("savedCountDown", JSON.stringify(savedCountDown));
  // save created object to local storage
  // stringify the object
  localStorage.setItem("countdown", JSON.stringify(savedCountDown));
  updateDOM(countDownDate);
}
// Reset All Values
function reset() {
  // Hide Countdowns, show Input
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true;
  // stop the countdown
  clearInterval(countdownActive);
  // Reset Values
  countdownElTitle = "";
  countdownDate = "";
  // remove data from local storage
  localStorage.removeItem("countdown");
}
// check if data is already present in local storage
function restorePreviousCountdown() {
  // Get Countdown from localstorage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem("countdown"));
    // repopulate the title and date form local storage
    countDownTitle = savedCountDown.title;
    countDownDate = savedCountDown.date;
    updateDOM(countDownDate);
  }
}
// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
// On load, check local storage
restorePreviousCountdown();
