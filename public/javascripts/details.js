// klona produktkort
const template = document.querySelector("#product-card-template");

const slide = document.querySelector(".slideshow-container > div");

for (let i = 0; i < 8; i++) {
    const fragment = template.content.cloneNode(true);
    slide.appendChild(fragment);
}

// slide-show

const track = document.querySelector('.slideshow-track');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

const totalItems = document.querySelectorAll('.slideshow-card').length;

let currentIndex = 0;

function updateTrackPosition() {
    const itemWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - 3) {
        currentIndex++;
        updateTrackPosition();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateTrackPosition();
    }
});

updateTrackPosition();

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