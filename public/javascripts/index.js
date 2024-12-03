const template = document.querySelector("#product-card-template");

const grid = document.querySelector(".product > div");

for (let i = 0; i < 4; i++) {
    const fragment = template.content.cloneNode(true);
    grid.appendChild(fragment);
}

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