var container = document.querySelector('.container');
var seats = document.querySelectorAll('.row .seat:not(.occupied)');
var count = document.getElementById('count');
var total = document.getElementById('total');
var movieSelect = document.getElementById('movie');
// var ticketPrice = parseInt(movieSelect.value)
//+ indicator is used for converting string to number
var ticketPrice = +movieSelect.value

populateUI()
// console.log(typeof ticketPrice)
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndexLocalStorage', movieIndex)
    localStorage.setItem('selectedMoviePriceLocalStorage', moviePrice)
}
// Update Total and Count
function updateSelectedCount() {
    var selectedSeats = document.querySelectorAll('.row .seat.selected');
    var seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat)
    })
    console.log("--seatsIndex--")
    console.log(seatsIndex)
    localStorage.setItem('selectedSeatsLocalStorage', JSON.stringify(seatsIndex))
    // Copy selected seats into arr
    // Map through Array
    // return a new aray indices

    var selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
// movie select event
document.querySelector("#movie").addEventListener('change', function (e) {
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

function populateUI() {
    var selectedSeatsFromLocalStorage = JSON.parse(localStorage.getItem('selectedSeatsLocalStorage'))
    console.log("local storage data -selectedSeatsFromLocalStorage-" + selectedSeatsFromLocalStorage);
    console.log("--seats--")
    console.log(seats)
    if (selectedSeatsFromLocalStorage != null && selectedSeatsFromLocalStorage.length > 0) {
        seats.forEach(function (seat, index) {
            console.log("index-" + index)
            if (selectedSeatsFromLocalStorage.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
    var selectedMovieIndex = localStorage.getItem('selectedMovieIndexLocalStorage');
    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}
// Seat Click Event
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') &&
        (!e.target.classList.contains('occupied'))) {
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})

updateSelectedCount()
