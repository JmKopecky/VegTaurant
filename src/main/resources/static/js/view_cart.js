
function initCart() {
    populateCartData();

    const codeInput = document.getElementById("code-input");
    doCodeInputChange(codeInput.value);
    codeInput.addEventListener("input", () => {
        doCodeInputChange(codeInput.value);

        if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") { //note, if cookies are disabled, this will not work. Add a banner or notif of some sort telling the user to disable cookies if so.
            //redirect to menu. feature: check if signed in, and if so, display a different page about starting an order from their favorite items or past orders.
            barba.go(window.location.origin + "/menu")
        } else {
            //cart is an array of objects, with each object being
            let cart = JSON.parse(localStorage.getItem("cart"));
            calculateCosts(cart)
        }

    });
}


function populateCartData() {
    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") { //note, if cookies are disabled, this will not work. Add a banner or notif of some sort telling the user to disable cookies if so.
        //redirect to menu. feature: check if signed in, and if so, display a different page about starting an order from their favorite items or past orders.
        barba.go(window.location.origin + "/menu");
    } else {
        //load present cart for viewing.
        //cart is an array of objects, with each object being
        let cart = JSON.parse(localStorage.getItem("cart"));
        calculateCosts(cart);
    }
}


function placeOrder() {
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
        barba.go(window.location.origin + "/order");
    } else {
        barba.go(window.location.origin + "/menu");
    }
}


function removeItem(tile) {
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let newCart = [];
        let tileLabel = tile.getElementsByClassName("item-label")[0].textContent.split(" X ")[0];
        for (const item of cart) {
            if (item["label"] !== tileLabel) {
                newCart.push(item);
            } else if (item["count"] > 1) {
                item["count"] = parseInt(item["count"]) - 1;
                newCart.push(item)
            }
        }

        if (newCart.length <= 0) {
            localStorage.setItem("cart", "unset");
        } else {
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
        calculateCosts(newCart);


        animateCartChange();

        let cartHeaderNumber = document.getElementById("cart-item-count");
        if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
            let count = 0;
            for (const item of JSON.parse(localStorage.getItem("cart"))) {
                count += parseInt(item["count"]);
            }
            cartHeaderNumber.textContent = "" + count;
        } else {
            cartHeaderNumber.textContent = "0";
        }
    }
}


function calculateCosts(cart) {
    doCodeInputChange(document.getElementById("code-input").value);

    let subtotal = 0;
    let itemCount = 0;

    let container = document.getElementById("cart-items-container");
    container.innerHTML = "";

    for (const item of cart) {
        let label = item["label"];
        let price = item["price"];
        let count = parseInt(item["count"]);
        let priceNum = parseFloat(price);
        subtotal += parseFloat((priceNum * count).toFixed(2));
        itemCount += count;


        let tile = document.createElement("div");
        tile.classList.add("cart-item-tile");
        tile.addEventListener("click", () => {
            removeItem(tile);
        });
        let labelContainer;
        let priceContainer;
        if (window.innerWidth < 500) {
            console.log("ran");
            labelContainer = document.createElement("h6");
            priceContainer = document.createElement("p");
        } else {
            console.log("alsoran");
            labelContainer = document.createElement("h3");
            priceContainer = document.createElement("h4");
        }
        labelContainer.classList.add("item-label");
        priceContainer.classList.add("item-price");
        labelContainer.textContent = label;
        if (count > 1) {
            labelContainer.textContent += " X " + count;
        }
        tile.appendChild(labelContainer);
        priceContainer.textContent = "$" + (parseFloat(price) * count).toFixed(2);
        tile.appendChild(priceContainer);
        container.appendChild(tile);
    }
    document.getElementById("cart-total-price-subtotal").textContent = "$" + (subtotal.toFixed(2));
    const discountElem = document.getElementById("cart-total-discount");
    let discount = parseFloat(discountElem.textContent.substring(1, discountElem.textContent.length));
    let tax = (subtotal - discount) * 0.0825;
    document.getElementById("cart-total-tax").textContent = "$" + tax.toFixed(2);
    let total = parseFloat(subtotal.toFixed(2)) - discount + parseFloat(tax.toFixed(2));
    document.getElementById("cart-total-price").textContent = "$" + total.toFixed(2);
    document.getElementById("cart-total-count").textContent = "Items: " + itemCount;
}


function doCodeInputChange(val) {
    const discountElem = document.getElementById("cart-total-discount");

    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") { //note, if cookies are disabled, this will not work. Add a banner or notif of some sort telling the user to disable cookies if so.
        //redirect to menu. feature: check if signed in, and if so, display a different page about starting an order from their favorite items or past orders.
        barba.go(window.location.origin + "/menu");
    } else {
        //cart is an array of objects, with each object being
        let cart = JSON.parse(localStorage.getItem("cart"));
        let subtotal = 0;
        for (const item of cart) {
            let price = item["price"];
            let count = parseInt(item["count"]);
            let priceNum = parseFloat(price);
            subtotal += parseFloat((priceNum * count).toFixed(2));
        }

        if (val === "MONDAY") {
            discountElem.textContent = "$" + (subtotal * 0.1).toFixed(2);
            return;
        }

        discountElem.textContent = "$" + "0.00";
    }
}