const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(occupied)')
const count = document.querySelector('.count')
const total = document.querySelector('.total')
const movieSelect = document.querySelector('.movie')
populateUI()
//turn it from a string into a number
let ticketPrice = parseInt(movieSelect.value)

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Update Total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    //Copy Selected Seats into arr, map through array, return a new array indexes
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    })
    //Save selected seats to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))


    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

//get data from localstorage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    //checking if we have any selected seats in localstorage
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            //checking to make sure we have a seat in the array
            if (selectedSeats.indexOf(index) > -1) {
                //make the seat selected
                seat.classList.add('selected')
            }
        })
    }

    //get the selected movie from local storage 
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }



}


//Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = parseInt(e.target.value)
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()

})


//click event for seats we can do this by adding a forEach to the seats element or we can do it by targeting the container
//and then targeting any item in the container that has the classname of seat & doesnt have the class of occupied
//Seat Click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})

//Initial count and total set
updateSelectedCount()



















