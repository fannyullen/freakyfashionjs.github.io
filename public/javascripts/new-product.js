const form = document.querySelector("form");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const form = new FormData(event.target);

    const product = {
        productName: form.get("productName"),
        SKU: form.get("SKU"),
        productPrice: form.get("productPrice"),
        image: form.get("image")
    }
    
    fetch("/admin/new", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)
        
    }).then(resp => {
        location.href = "/admin";
    });
});