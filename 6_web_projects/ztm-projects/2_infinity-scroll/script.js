const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// unsplash api
let imageCount = 30;
const apiKey = "Zl3WKL1mRu-phHsB0aoRjbAUuYleJGHGnqfTbaB467I";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
// Check if all images were loaded - this function is called for each individual image
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  // console.log("imagesLoaded", imagesLoaded);
  if (imagesLoaded === totalImages) {
    // set ready boolean if all images are loaded
    ready = true;
    loader.hidden = true;
    console.log("ready==", ready);
    console.log("imagesLoaded", imagesLoaded);
  }
}

// Helper function to display data
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  // reset the imagesLoaded counter
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //   Create <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    // setting attributes using helper function
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.urls.regular);
    // setting attributes using helper function
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.urls.regular,
    });
    // EventListener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}
// Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener("scroll", function () {
  console.log("scrolled");
  // window.innerHeight - height of browser window
  // window.scrollY - how high we are from top of the page
  //document.body.offsetHeight - total height of page (even includes the height not displayed in browser window)
  //run this function only if all images are loaded
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// on Load
getPhotos();
