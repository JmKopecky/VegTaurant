


document.addEventListener("DOMContentLoaded", (event) => {
    populateCartData();

    registerAnimations()
});


function populateCartData() {
    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") { //note, if cookies are disabled, this will not work. Add a banner or notif of some sort telling the user to disable cookies if so.
        //redirect to menu. TODO: check if signed in, and if so, display a different page about starting an order from their favorite items or past orders.
        window.location.replace(window.location.origin + "/menu")
    } else {
        //load present cart for viewing.
        //cart is an array of objects, with each object being
        let cart = JSON.parse(localStorage.getItem("cart"));
        calculateCosts(cart);
    }
}


function placeOrder() {
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
        window.location.replace(window.location.origin + "/order");
    } else {
        window.location.replace(window.location.origin + "/menu");
    }
}


function removeItem(tile) {
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let newCart = [];
        for (const item of cart) {
            if (item["label"] !== tile.getElementsByTagName("h3")[0].textContent) {
                newCart.push(item);
            }
        }

        if (newCart.length <= 0) {
            localStorage.setItem("cart", "unset");
        } else {
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
        calculateCosts(newCart);

        let cartHeaderNumber = document.getElementById("cart-item-count");
        if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
            cartHeaderNumber.textContent = JSON.parse(localStorage.getItem("cart")).length;
        } else {
            cartHeaderNumber.textContent = "0";
        }
    }
}


function calculateCosts(cart) {
    let subtotal = 0;
    let itemCount = 0;

    let container = document.getElementById("cart-items-container");
    container.innerHTML = "";

    for (const item of cart) {
        let label = item["label"];
        let price = item["price"];
        subtotal += parseInt(price);
        itemCount++;

        //todo: create tile for item in cart display.


        let tile = document.createElement("div");
        tile.classList.add("cart-item-tile");
        tile.addEventListener("click", () => {
            removeItem(tile);
        });
        let labelContainer = document.createElement("h3");
        labelContainer.textContent = label;
        tile.appendChild(labelContainer);
        let priceContainer = document.createElement("h4");
        priceContainer.textContent = "$" + price;
        tile.appendChild(priceContainer);
        container.appendChild(tile);
    }
    document.getElementById("cart-total-price-subtotal").textContent = "$" + subtotal.toFixed(2);
    let tax = subtotal * 0.0825;
    document.getElementById("cart-total-tax").textContent = "$" + tax.toFixed(2);
    let total = parseFloat(subtotal.toFixed(2)) + parseFloat(tax.toFixed(2));
    document.getElementById("cart-total-price").textContent = "$" + total.toFixed(2);
    document.getElementById("cart-total-count").textContent = "Items: " + itemCount;
}


function registerAnimations() {

}