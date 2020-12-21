const videoElement = document.getElementById("video");
const button = document.getElementById("button");
// Prompt to select media stream, pass to video element then play
async function selectMediaStream() {
  try {
    // to use await we must specify the function as a async keywork in front of the function
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    // provide a source
    videoElement.srcObject = mediaStream;
    // true when finished loading
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    // Catch error
    console.log("whoops error here", error);
  }
}
button.addEventListener("click", async () => {
  // Disable button
  button.disabled = true;
  // Start picture in picture
  await videoElement.requestPictureInPicture();
  //   reset button
  button.disabled = false;
});
// on load
selectMediaStream();
