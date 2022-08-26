const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updatedSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const selectedSeatsCount = selectedSeats.length;

	// Copy selected seats into arr
	// Map through array
	// Return a new array indexes
	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	// Store data
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}
// Movie select event
movieSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updatedSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');

		updatedSelectedCount();
	}
});
