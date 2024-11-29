



document.addEventListener("DOMContentLoaded", (event) => {
    registerAnimations()

    setMenuCategory("All");
});


function registerAnimations() {

}



function mobileNavAccordionClick(mode) {
    if (mode === 'show') {
        document.getElementById("menu-accordion-panel").setAttribute("data-hide", "false");
        document.getElementById("show-accordion-panel").style.display = "none";
        document.getElementById("hide-accordion-panel").style.display = "block";
    } else {
        document.getElementById("menu-accordion-panel").setAttribute("data-hide", "true");
        document.getElementById("show-accordion-panel").style.display = "block";
        document.getElementById("hide-accordion-panel").style.display = "none";
    }
}




function setMenuCategory(targetCategory) {
    document.getElementById("nav-accordion-header-label").textContent = targetCategory;

    let targetContainer = document.getElementById("menucontainer_" + targetCategory);
    let clicked = document.getElementById("cattile_" + targetCategory);

    for (const tile of document.getElementsByClassName("menu-topic-tile")) {
        if (tile.getAttribute("id") === "cattile_" + targetCategory) {
            tile.classList.add("category-selected");
        } else {
            tile.classList.remove("category-selected");
        }
    }

    for (const container of document.getElementsByClassName("menu-items")) {
        if (container.getAttribute("id") === "menucontainer_" + targetCategory) {
            container.setAttribute("style", "display: flex;");
        } else {
            container.setAttribute("style", "display: none;");
        }
    }
}


function hideOverlay(event, element) {
    if (event.target !== element) {
        event.stopPropagation();
        return;
    }
    document.getElementById("menu-item-overlay").setAttribute("style", "display: none;");
}


function retrieveItemData(itemLabel) { //todo: add support for items to have customization if that fits with the food.
    fetch("/menu", {
        "method": "POST",
        "body": JSON.stringify({
            "isdatarequest": true,
            "targetitem": itemLabel
        }),
        "headers": {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((r) => {
        r.json().then(data => {
            let overlay = document.getElementById("menu-item-overlay");
            overlay.setAttribute("style", "display: flex;");
            document.getElementById("menu-item-overlay-name").textContent = data["label"];
            document.getElementById("menu-item-overlay-price").textContent = "$" + data["price"];
            document.getElementById("menu-item-overlay-rating").textContent = data["rating"] + "/5 (" + data["totalratings"] + ")";
            document.getElementById("menu-item-overlay-image").setAttribute("src", data["image"]);
            document.getElementById("menu-item-overlay-desc").textContent = data["desc"];
        });
    });
}


function addItemToCart() {
    let label = document.getElementById("menu-item-overlay-name").textContent;
    let price = document.getElementById("menu-item-overlay-price").textContent.substring(1);
    let item = {
        "label": label,
        "price": price
    }

    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") {
        //create cart.
        let cart = [item];
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        //add to cart.
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    //hide overlay
    document.getElementById("menu-item-overlay").setAttribute("style", "display: none;");

    let cartHeaderNumber = document.getElementById("cart-item-count");
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
        cartHeaderNumber.textContent = JSON.parse(localStorage.getItem("cart")).length;
    } else {
        cartHeaderNumber.textContent = "0";
    }
}