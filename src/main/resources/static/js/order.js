
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
    registerAnimations();

    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") {
        window.location.replace(window.location.origin + "/menu");
    }

    let cartHeaderNumber = document.getElementById("cart-item-count");
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
        cartHeaderNumber.textContent = JSON.parse(localStorage.getItem("cart")).length;
    } else {
        cartHeaderNumber.textContent = "0";
    }
});


function onSelectLocationType(target) {
    for (const elem of document.getElementsByClassName("loc-type-selectable")) {
        if (target === elem.textContent) {
            elem.classList.add("picked");
        } else {
            elem.classList.remove("picked");
        }
    }

    if (target === "Delivery") {
        //show address enter
        document.getElementById("enter-address").style.display = "flex";
        document.getElementById("select-address-from-list").style.display = "none";
    } else {
        //show list of locations
        document.getElementById("enter-address").style.display = "none";
        document.getElementById("select-address-from-list").style.display = "flex";
    }
}


function selectLocation(target) {
    for (const elem of document.getElementsByClassName("location-tile")) {
        elem.classList.remove("selected");
    }
    target.classList.add("selected");
}


function registerAnimations() {

}