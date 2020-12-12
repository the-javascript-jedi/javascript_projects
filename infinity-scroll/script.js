const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];
// unsplash api
const count = 10;
const apiKey = "Zl3WKL1mRu-phHsB0aoRjbAUuYleJGHGnqfTbaB467I!";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Helper function to display data
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
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
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.urls.regular);
    // setting attributes using helper function
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.urls.regular,
    });
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

// on Load
getPhotos();
