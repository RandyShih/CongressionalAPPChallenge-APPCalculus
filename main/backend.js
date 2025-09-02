// Check if a name is already stored
let name = localStorage.getItem('name');

if (!name) {
    // Prompt the user for their name
    name = prompt("Please enter your name:");

    // Store it in Local Storage
    if (name) { // make sure they actually typed something
        localStorage.setItem('name', name);
        alert(`Thanks, ${name}! Your name has been saved.`);
    }
} else {
    // Greet the user if name already exists
    alert(`Welcome back, ${name}!`);
}



function siteRedirect() {
    /*window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScQn1CCsHeMndLWWdk6ilUlblrh4VHgvfa_Ap8azPtA-L3tww/viewform";*/
    alert(env.testing);
}

function pageRedirect(page) {
    window.location.href = page
}