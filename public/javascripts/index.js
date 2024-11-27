// 1 - få tag på referens till template
const template = document.querySelector("#product-card-template");

// få tag på referens till grid:en (<div>)
const grid = document.querySelector(".product > div");

// 3 - skapa en klon (fragment) av template

// använder metoden clondeNode för att klona produktkorten, vi sätter cloneNode till true för att de ska klonas
// så länge i är mindre än 4, i++ = lägg till 1 / pluis 1 / i + 1
for (let i = 0; i < 4; i++) {
    const fragment = template.content.cloneNode(true);
    // med appendChild så lägger vi till de klonade produktkorten till sidan
    grid.appendChild(fragment);
}

// 4 - Lägg till på DOM:en

// Accordion

// väljer ut elementet genom klassnamnet och refererar till 
// elementet genom variabeln acc
let acc = document.getElementsByClassName("accordion");
let i;

// for-loop
for (i = 0; i < acc.length; i++) {

    // adding an eventListener, when the accordion button is clicked
    // the following function is executed. 
    acc[i].addEventListener("click", function() {
        
        // Toggle between adding and removing the "active" class,
        // to highlight the button that controls the panel
        
        // Toggle: Skiftar mellan att lägga till och ta bort active-klassen
        // så att accordion öppnas och stängs
        this.classList.toggle("active");

        // Toggle between hiding and showing the active panel
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}