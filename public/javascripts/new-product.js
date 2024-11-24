// JavaScript kod för att lägga till data från ett formulär i databasen

// här skapar jag en variabel (en referens) som plockar ut ett form-element, som vi ska använda
const form = document.querySelector("form");

// vi lägger till en eventListener för vi vill att datan som skrivs in i formuläret ska läggas till i databasen när vi klickar på submit-knappen. 

// registrerar en händelselyssnare, där vi anger en funktion som ska anropas i samband med att en submit-händelse inträffar
form.addEventListener("submit", function (event) {
    // Som standard när man klickar på en knapp i ett formulär så skickas
    // informationen automatiskt till backend. I detta fall vill vi dock själv
    // samla in och skicka informationen med hjälp av JavaScript
    event.preventDefault();

    // Skapar en variabel: "form". FormData är en metod för att komma åt
    // värdena i fälten i formuläret. Event.target: where the event occurred
    const form = new FormData(event.target);

    // Ett objekt, vi vill hämta ut infon nedan från formuläret till databasen
    const product = {
        productName: form.get("productName"),
        SKU: form.get("SKU"),
        productPrice: form.get("productPrice"),
        image: form.get("image")
    }
    
    // Skickar datan från frontend till backend (i JSON-format) med inbyggda
    // funktionen Fetch (API). 
    fetch("/new/product", { // skickar ett anrop till /new/product (POST: /new/product)
        // HTTP-metod som ska användas
        // till skillnad från tidigare när vi använt GET för att hämta information, så använder vi nu metoden POST (för att skicka information)
        // Vi berättar här att metoden som ska användas ska vara POST
        // som standard så kommer FETCH använda GET annars
        // vi ändrar det standard-beteendet genom att specifiera method: POST
        method: "POST",
        // Vi berättar för backend att informationen vi skickar
        // är data formaterad som JSON.
        headers: { // meta data
            "Content-Type": "application/json"
        },

        // JSON.stringify() skapar en JSON-formaterad text-sträng
        // som sedan skickas till backend
        body: JSON.stringify(product)
        // body-delen av anropet: är en del av http-anropet som håller information som ska skickas till backend i detta fall
    });
});