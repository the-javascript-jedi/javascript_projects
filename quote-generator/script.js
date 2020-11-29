const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
// Show Loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading
function removeLoadingSpinner() {
  // check if the loader is shown then display the quote container and hide the loader
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get Quote From API
async function getQuote() {
  // show loaeder
  showLoadingSpinner();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // const data = {
    //   quoteText:
    //     "The universe is full of magical things, patiently waiting for our wits to grow sharper. ",
    //   quoteAuthor: "",
    //   senderName: "Epictetus",
    //   senderLink: "",
    //   quoteLink: "http://forismatic.com/en/5f1702a866/",
    // };
    console.log("data", data);
    // If Author is blank, add unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    // Stop Loader, Show Quote
    removeLoadingSpinner();
  } catch (errror) {
    //call another quote if we get an error
    //recursive error will come so use a counter for calling this function and if counter exeeds 10 stop making the api calls
    // getQuote();
    console.log("Whoops, no quote", errror);
  }
}
// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}
// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
// on load
getQuote();
