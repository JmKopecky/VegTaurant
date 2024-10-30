const lenis = new Lenis({
    syncTouch: true,
    duration: 1.5
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


function headerButtonClick() {
    let headerButton = document.getElementById("header-show-button");
    if (headerButton.getAttribute("data-headeropen") === "true") {
        headerButton.setAttribute("data-headeropen", "false");
        for (const link of document.getElementById("header-link-container").getElementsByTagName("a")) {
            if (!link.classList.contains("header-no-remove")) {
                link.setAttribute("style", "display: none;");
            }
        }
    } else {
        headerButton.setAttribute("data-headeropen", "true");
        for (const link of document.getElementById("header-link-container").getElementsByTagName("a")) {
            if (!link.classList.contains("header-no-remove")) {
                link.setAttribute("style", "display: block;");
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", (event) => {
    populateCartData();

    registerAnimations()
});


function populateCartData() {
    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") { //note, if cookies are disabled, this will not work. Add a banenr or notif of some sort telling the user to disable cookies if so.
        //redirect to menu. TODO: check if signed in, and if so, display a different page about starting an order from their favorite items or past orders.
        window.location.replace(window.location.origin + "/menu")
    } else {
        //load present cart for viewing.
        //cart is an array of objects, with each object being
        let cart = JSON.parse(localStorage.getItem("cart"));
        let itemCount = 0;
        let subtotal = 0;
        for (const item of cart) {
            let label = item["label"];
            let price = item["price"];
            itemCount++;
            subtotal += parseInt(price);

            //todo: create tile for item in cart display.
            let container = document.getElementById("cart-items-container");

            let tile = document.createElement("div");
            tile.classList.add("cart-item-tile");
            let labelContainer = document.createElement("h3");
            labelContainer.textContent = label;
            let priceContainer = document.createElement("h4");
            priceContainer.textContent = "$" + price;
            container.appendChild(tile);
        }
    }
}


function registerAnimations() {

}