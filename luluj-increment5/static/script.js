/* --- Date Greeting --- */

let now = new Date();
let hour = now.getHours();

function greeting(hour) {
    let greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        let message = "";

        if (hour < 5 || hour >= 20) {
            message = "Good night";
        } else if (hour < 12) {
            message = "Good morning";
        } else if (hour < 18) {
            message = "Good afternoon";
        } else {
            message = "Good evening";
        }

        greetingElement.innerHTML = message;
    }
}

greeting(hour);

/* --- Year Footing --- */

function addYear() {
    let year = new Date().getFullYear();
    let footer = document.getElementById("copyYear");

    if (footer) {
        footer.innerHTML = "© " + year + " MonoMuse Museum";
    }
}

/* --- Active Navigation --- */

/* Sets the 'active' class on the navigation link that matches the current page URL. */
function ActiveNav() {
    const navLinks = document.querySelectorAll('.nav_bar a');
    navLinks.forEach(link => {
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}

ActiveNav();

/* --- Read More / Read Less Toggle --- */

document.addEventListener("DOMContentLoaded", function () {

    let readMore = document.getElementById("readMore");
    let readLess = document.getElementById("readLess");
    let longIntro = document.getElementById("longIntro");

    // When the "Read More" button is clicked
    if (readMore && readLess && longIntro) {
        readMore.addEventListener("click", function () {
            longIntro.style.display = "block";    // Show the long introduction text
            readLess.style.display = "inline-block"; // Show the "Read Less" button
            readMore.style.display = "none";      // Hide the "Read More" button
        });

        // When the "Read Less" button is clicked
        readLess.addEventListener("click", function () {
            longIntro.style.display = "none";     // Hide the long introduction text
            readLess.style.display = "none";      // Hide the "Read Less" button
            readMore.style.display = "inline-block"; // Show the "Read More" button
        });
    }
});


/* --- Hamburger Menu Toggle --- */

function toggleMenu() {
    let navBar = document.querySelector(".nav_bar");
    navBar.classList.toggle("responsive");
}


/* --- Show Purchase Form --- */
 
/* Called by each Buy Now button's onclick.
   Reveals the hidden form and fills in the chosen date. */
function showForm(date) {
    // Reveal the form section
    let formSection = document.getElementById("purchaseFormSection");
    formSection.style.display = "block";
 
    // Fill in the selected date fields
    let selectedDateInput = document.getElementById("selectedDate");
    let selectedDateDisplay = document.getElementById("selectedDateDisplay");
 
    if (selectedDateInput) {
        selectedDateInput.value = date;
    }
 
    if (selectedDateDisplay) {
        selectedDateDisplay.innerHTML = "Selected date: " + date;
    }
 
    // Smooth-scroll down so the form comes into view
    formSection.scrollIntoView({ behavior: "smooth" });
}
 
 
/* --- Dynamic Calendar for Tickets Page --- */

var calendarMonth;
var calendarYear;

function buildCalendar(month, year) {
    var table = document.getElementById("scheduleTable");
    if (!table) return;

    calendarMonth = month;
    calendarYear = year;

    var today = new Date();
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth();
    var todayDay = today.getDate();

    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var html = '<tr><th colspan="7">';
    html += '<span class="cal-arrow" onclick="changeMonth(-1)">&#9664;</span> ';
    html += monthNames[month] + ' ' + year;
    html += ' <span class="cal-arrow" onclick="changeMonth(1)">&#9654;</span>';
    html += '</th></tr>';
    html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

    var day = 1;

    for (var week = 0; week < 6; week++) {
        html += "<tr>";

        for (var i = 0; i < 7; i++) {
            if ((week === 0 && i < firstDay) || day > daysInMonth) {
                html += "<td></td>";
            } else {
                var isPast = (year < todayYear) ||
                             (year === todayYear && month < todayMonth) ||
                             (year === todayYear && month === todayMonth && day < todayDay);

                if (isPast) {
                    html += '<td><span class="date passed">' + day + '</span></td>';
                } else {
                    var dateStr = monthNames[month] + ' ' + day + ', ' + year;
                    html += '<td><span class="date" onclick="selectCalendarDate(\'' + dateStr + '\')">' + day + '</span></td>';
                }
                day++;
            }
        }

        html += "</tr>";
        if (day > daysInMonth) break;
    }

    table.innerHTML = html;
}

function changeMonth(direction) {
    var newMonth = calendarMonth + direction;
    var newYear = calendarYear;

    if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    }

    buildCalendar(newMonth, newYear);
}

function selectCalendarDate(dateStr) {
    showForm(dateStr);
}

if (window.location.href.includes("tickets.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        var now = new Date();
        buildCalendar(now.getMonth(), now.getFullYear());
    });
}


/* --- Leaflet Map --- */

document.addEventListener("DOMContentLoaded", function () {
    var mapContainer = document.getElementById("map");
    if (mapContainer) {
        var map = L.map('map').setView([40.4443, -79.9436], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([40.4443, -79.9436]).addTo(map)
            .bindPopup('MonoMuse Museum', { offset: [0, -15] })
            .openPopup();
    }
});


/* --- Automatic Price Calculation --- */

function updatePrice() {
    var quantity = parseInt(document.getElementById("quantity").value) || 0;
    var ticketType = document.getElementById("ticketType").value;
    var pricePerTicket = 18;
    var total = ticketType ? quantity * pricePerTicket : 0;
    var totalField = document.getElementById("totalPrice");
    if (totalField) {
        totalField.value = "$" + total.toFixed(2);
    }
}


/* --- Place Order with Validation --- */

function placeOrder() {
    var valid = true;

    // Clear previous errors
    var errors = document.querySelectorAll(".error-msg");
    errors.forEach(function(el) { el.textContent = ""; });

    // Clear error styling
    var inputs = document.querySelectorAll(".input-error");
    inputs.forEach(function(el) { el.classList.remove("input-error"); });

    // Name validation
    var name = document.getElementById("name");
    if (!name.value.trim()) {
        document.getElementById("nameError").textContent = "Full name is required.";
        name.classList.add("input-error");
        valid = false;
    }

    // Email validation
    var email = document.getElementById("email");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        document.getElementById("emailError").textContent = "Email is required.";
        email.classList.add("input-error");
        valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        email.classList.add("input-error");
        valid = false;
    }

    // Ticket type validation
    var ticketType = document.getElementById("ticketType");
    if (!ticketType.value) {
        document.getElementById("ticketTypeError").textContent = "Please select a ticket type.";
        ticketType.classList.add("input-error");
        valid = false;
    }

    // Quantity validation
    var quantity = document.getElementById("quantity");
    var qty = parseInt(quantity.value);
    if (!quantity.value || isNaN(qty) || qty < 1 || qty > 10) {
        document.getElementById("quantityError").textContent = "Please enter a quantity between 1 and 10.";
        quantity.classList.add("input-error");
        valid = false;
    }

    // Zip code validation (optional, but if filled must be 5 digits)
    var zipCode = document.getElementById("zipCode");
    if (zipCode.value.trim() !== "") {
        var zipPattern = /^\d{5}$/;
        if (!zipPattern.test(zipCode.value.trim())) {
            document.getElementById("zipCodeError").textContent = "Zip code must be exactly 5 digits.";
            zipCode.classList.add("input-error");
            valid = false;
        }
    }

    // Selected date validation
    var selectedDate = document.getElementById("selectedDate");
    if (!selectedDate.value) {
        valid = false;
        alert("Please select a visit date from the calendar above.");
    }

    if (!valid) return;

    // Calculate total and redirect to confirmation page
    var total = qty * 18;
    var ticketLabel = ticketType.options[ticketType.selectedIndex].text;
    var mailingList = document.getElementById("mailingList").checked ? "Yes" : "No";

    var params = new URLSearchParams({
        name: name.value.trim(),
        email: email.value.trim(),
        ticketType: ticketLabel,
        quantity: qty,
        total: total.toFixed(2),
        date: selectedDate.value,
        mailingList: mailingList
    });

    window.location.href = "confirmation.html?" + params.toString();
}