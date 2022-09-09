const data = [
  {
    name: "John Doe",
    age: 32,
    gender: "male",
    lookingfor: "female",
    location: "Boston MA",
    image: "https://randomuser.me/api/portraits/med/men/75.jpg",
  },
  {
    name: "Jen Smith",
    age: 26,
    gender: "female",
    lookingfor: "male",
    location: "Miami FL",
    image: "https://randomuser.me/api/portraits/med/women/77.jpg",
  },
  {
    name: "Fiona",
    age: 21,
    gender: "female",
    lookingfor: "female",
    location: "Boston MA",
    image: "https://randomuser.me/api/portraits/med/women/80.jpg",
  },
];
const profiles = profileIterator(data);
// Load Data on page load
nextProfile();
// Next Event
document.getElementById("next").addEventListener("click", nextProfile);
// Next Profile Display
function nextProfile() {
  const currentProfile = profiles.next().value;
  if (currentProfile !== undefined) {
    document.getElementById("profileToDisplay").innerHTML = `
<ul class="list-group">
  <li class="list-group-item">Name:${currentProfile.name}</li>
  <li class="list-group-item">Age:${currentProfile.age}</li>
  <li class="list-group-item">Location:${currentProfile.location}</li>
  <li class="list-group-item">Preference:${currentProfile.gender} looking for
     ${currentProfile.lookingfor}
  </li>
</ul>
        `;
    document.getElementById("imageToDisplay").innerHTML = `
        <img src=${currentProfile.image}>
        `;
  } else {
    // no more users to show reload the page
    window.location.reload();
  }
}

function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function () {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true };
    },
  };
}
