// Add eventListener to "ladda produkter"-button

const button = document.querySelector(".product-btn-2");

button.addEventListener("click", function (event) {
    event.preventDefault();
    
    fetch("/api/products") // med FETCH API så hämtas informationen om produkterna från databasen
    .then(resp => resp.json())
    .then(products => {
        console.log(products);

        // när informationen har hämtats så ska den läggas in på sidan
        // i detta fall så vill jag lägga datan i en tabell
        // då måste jag plocka ut det elementet från ejs-sidan med hjälp av 
        // querySelector, och jag skapar en javaScript variabel som heter table

    const table = document.querySelector("table");

    // med hjälp av en for-loop så itererar vi över datan vi hämtat, och den listas på sidan, i en tabell som jag skapat i ejs-filen
    for (let product of products) {

        // Här skapas ett table row-element för det har vi inte i tabellen, och vi vill att dessa ska skapas dynamiskt, och detta element ska fyllas med table-data element i nästa steg
        const tr = document.createElement("tr");

        // här skapar jag 3 table data-element med hjälp av metoden createElement som ska innehålla info om produktnamn, SKU och pris
        const tdName = document.createElement("td");
        const tdSKU = document.createElement("td");
        const tdPrice = document.createElement("td");

        // genom metoden appendChild så lägger jag till mina table data-element till table-row elementet
        tr.appendChild(tdName);
        tr.appendChild(tdSKU);
        tr.appendChild(tdPrice);

        // sedan skapas innehåll till table data-elementen, och här vill vi se till att innehållet i td är data som kommer ifrån databasen. Innehållet i td, dvs "textContent", är data från databasen
        tdName.textContent = `${product.productName}`;
        tdSKU.textContent = `${product.SKU}`;
        tdPrice.textContent = `${product.productPrice}`;

        // här lägger vi till dessa element på sidan med hjälp av metoden appendChild
        table.appendChild(tr);
        table.appendChild(tdName);
        table.appendChild(tdSKU);
        table.appendChild(tdPrice);
    }
    });

});