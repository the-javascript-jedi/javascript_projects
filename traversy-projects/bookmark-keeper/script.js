const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];
//Show Modal, Focus on Input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
// close modal on overlay click
window.addEventListener("click", (e) => {
  //console.log("e.target", e.target);
  e.target === modal ? modal.classList.remove("show-modal") : false;
});
// Validate form
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  //   check if email and name field has some value
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields");
    return false;
  }
  //   check if email is valid
  //   if (urlValue.match(regex)) {
  //     alert("match");
  //   }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address");
    return false;
  }
  //   Valid
  return true;
}
// Build Bookmarks DOM
function buildBookmarks() {
  // Remove All bookmarks elements
  bookmarksContainer.textContent = "";
  // Build Items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // console.log(name, url);
    const item = document.createElement("div");
    item.classList.add("item");
    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onClick", `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://www.google.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to Bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}
// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from local storage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // create bookmarks array in local storage
    bookmarks = [
      {
        name: "Jacinto Design",
        url: "https://jacinto.design",
      },
    ];
    // set data to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  // console.log("bookmarks--fetchBookmarks", bookmarks);
  buildBookmarks();
}
// Delete Bookmark
function deleteBookmark(url) {
  console.log("deleteurl", url);
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in local storage, re - populate DOM
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}
// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }
  console.log("form values", nameValue, urlValue);
  // validate function returns false for a invalid data
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  //console.log("bookmarks", bookmarks);
  // store in local storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  // reset bookmark form
  bookmarkForm.reset();
  websiteNameEl.focus();
}
// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
