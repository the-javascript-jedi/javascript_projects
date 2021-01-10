const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");
// Dark or Light Images
function imageMode(color) {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}
// Dark Mode Styles
function darkMode() {
  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
  // console.log(toggleIcon.children);
  // HTMLCollection(2) [span.toggle-text, i.fas.fa-sun]
  // 0: span.toggle-text
  // 1: i.fas.fa-sun
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  imageMode("dark");
}
// light Mode Styles
function lightMode() {
  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  imageMode("light");
}
// switch theme dynamically
function switchTheme(event) {
  if (event.target.checked) {
    //Document.documentElement returns the Element that is the root element of the document (for example, the <html> element for HTML documents).
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    lightMode();
  }
}
// Event Listener
toggleSwitch.addEventListener("change", switchTheme);
// Check Local Storage for Theme
const currentTheme = localStorage.getItem("theme");
console.log("currentTheme", currentTheme);
// check if theme exists in local storage
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  // set switch to dark theme if local storage has dark theme on page load
  if (currentTheme == "dark") {
    toggleSwitch.checked = true;
    darkMode();
  }
}
