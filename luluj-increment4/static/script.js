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
 
 
/* --- Submit / Redirect Alert --- */
 
/* Called by the submit button's onclick.
   Simulates handing off to a payment system. */
function submitForm() {
    alert("Redirecting to payment system.");
}