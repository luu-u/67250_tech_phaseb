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