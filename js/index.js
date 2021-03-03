const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(occupied)')
const count = document.querySelector('.count')
const total = document.querySelector('.total')
const movieSelect = document.querySelector('.movie')
//turn it from a string into a number
let ticketPrice = parseInt(movieSelect.value)




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
    total.textContent = selectedSeatsCount * ticketPrice
}

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
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





















