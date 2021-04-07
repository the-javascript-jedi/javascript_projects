const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
let countdownTitle = "";
let countdownDate = "";
// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
// today before split-> 2021-04-07T18:14:43.335Z
// set the date to not accept past dates
dateEl.setAttribute("min", today);
// Take values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownTitle, countdownDate);
}
// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
