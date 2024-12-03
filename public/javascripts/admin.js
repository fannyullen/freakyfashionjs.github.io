const button = document.querySelector(".product-btn-2");

const tableRow = document.querySelector(".tr");

button.addEventListener("click", function (event) {
    
    tableRow.style.display = "none";

    fetch("/api/products")
        .then(resp => resp.json())
        .then(products => {
        console.log(products);


    const table = document.querySelector("table");

    for (let product of products) {

        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        const tdSKU = document.createElement("td");
        const tdPrice = document.createElement("td");

        tr.appendChild(tdName);
        tr.appendChild(tdSKU);
        tr.appendChild(tdPrice);

        tdName.textContent = `${product.productName}`;
        tdSKU.textContent = `${product.SKU}`;
        tdPrice.textContent = `${product.productPrice}`;

        table.appendChild(tr);
        table.appendChild(tdName);
        table.appendChild(tdSKU);
        table.appendChild(tdPrice);
    }
    });
});