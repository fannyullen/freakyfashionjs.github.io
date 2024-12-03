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

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function() {
        
        this.classList.toggle("active");

        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}