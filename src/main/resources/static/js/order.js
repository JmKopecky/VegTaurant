let address = "unset";
let delivery = false;



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


function submitLocation() {
    let mode = "unset";
    for (const elem of document.getElementsByClassName("loc-type-selectable")) {
        if (elem.classList.contains("picked")) {
            mode = elem.textContent;
        }
    }
    if (mode === "unset") {
        document.getElementById("location-type-header").style.color = "red";
        return;
    }

    if (mode === "Delivery") {
        if (document.getElementById("target-address-text-input").value !== "") {
            address = document.getElementById("target-address-text-input").value;
            delivery = true;
        }
    } else {
        for (const elem of document.getElementsByClassName("location-tile")) {
            if (elem.classList.contains("selected")) {
                address = elem.getElementsByClassName("location-address")[0].textContent;
                delivery = false;
                break;
            }
        }
    }
    if (address !== "unset") {
        console.log(address + " " + delivery);
        initBillingInfo();
    } else {
        if (mode === "Delivery") {
            document.getElementById("address-enter-label").style.color = "red";
        } else {
            document.getElementById("location-selection-header").style.color = "red";
        }

    }

}


function initBillingInfo() {
    document.getElementById("location-container").style.display = "none";
    document.getElementById("billing-info-container").style.display = "flex";

    if (account !== "noaccount") {
        document.getElementById("billing-name-input").value = account["cardUserName"];
        document.getElementById("billing-address-input").value = account["address"];
        document.getElementById("billing-city-input").value = account["city"];
        document.getElementById("billing-state-input").value = account["state"];
        document.getElementById("billing-country-input").value = account["country"];
        document.getElementById("billing-zip-input").value = account["zip"];
        document.getElementById("billing-phone-input").value = account["phone"];
        document.getElementById("billing-cardnum-input").value = account["cardNumber"];
        document.getElementById("billing-expdate-input").value = account["expirationDate"];
        document.getElementById("billing-seccode-input").value = account["securityCode"];
    }
}


function registerAnimations() {

}