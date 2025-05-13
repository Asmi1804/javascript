let selectedMovie = '';
let selectedSeats = [];

// Function to handle theater selection
function chooseTheater() {
  const theater = document.getElementById("theater-select").value;
  if (theater !== 'Select a Theater') {
    document.getElementById('theater-title').textContent = 'Movies in ' + theater;
    document.getElementById('movie-selection-page').style.display = 'block';
  } else {
    alert("Please select a theater.");
  }
}

// Function to handle movie selection
function selectMovie(movie) {
  selectedMovie = movie;
  document.getElementById('selected-movie').textContent = movie;
  
  // Hide movie section, show seat selection
  document.getElementById('movie-selection-page').style.display = 'none';
  document.getElementById('seat-selection-page').style.display = 'block';
}

// Function to toggle seat selection
function toggleSeat(seatButton) {
  const seat = seatButton.textContent;
  if (selectedSeats.includes(seat)) {
    selectedSeats = selectedSeats.filter(s => s !== seat);
    seatButton.classList.remove('selected');
  } else {
    selectedSeats.push(seat);
    seatButton.classList.add('selected');
  }
}

// Function to proceed to payment
function goToPayment() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  document.getElementById('selected-seats').textContent = selectedSeats.join(', ');
  
  // Hide seat selection, show payment page
  document.getElementById('seat-selection-page').style.display = 'none';
  document.getElementById('payment-page').style.display = 'block';
}

// Function to handle payment in theater
function payInTheatre() {
  document.getElementById('final-movie').textContent = selectedMovie;
  document.getElementById('final-seats').textContent = selectedSeats.join(', ');
  
  // Hide payment page, show download page
  document.getElementById('payment-page').style.display = 'none';
  document.getElementById('download-ticket-page').style.display = 'block';
}

// Function to generate and download PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text(20, 20, 'Movie Ticket');
  doc.text(20, 30, `Movie: ${selectedMovie}`);
  doc.text(20, 40, `Seats: ${selectedSeats.join(', ')}`);
  
  doc.save('ticket.pdf');
}
