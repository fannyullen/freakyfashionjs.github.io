// JavaScript kod för att lägga till data från ett formulär i databasen

// här skapar jag en variabel som plockar ut ett form-element, som vi ska använda
const form = document.querySelector("form");

// vi lägger till en eventListener för vi vill att datan som skrivs in i formuläret ska läggas till i databasen när vi klickar på submit-knappen. 
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Skapar en variabel, FormData är en metod
    const form = new FormData(event.target);

    // Ett objekt, vi vill hämta ut infon nedan från formuläret till databasen
    const product = {
        productName: form.get("productName"),
        SKU: form.get("SKU"),
        productPrice: form.get("productPrice"),
        image: form.get("image")
    }
    
    // vi skickar datan i JSON-format
    fetch("/new/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)
    });
});