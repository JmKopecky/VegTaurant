



let address = "unset";
let delivery = false;



document.addEventListener("DOMContentLoaded", (event) => {
    registerAnimations();

    populateItemsForReview();

    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") {
        window.location.replace(window.location.origin + "/menu");
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


function finalizeOrder() {
    document.getElementById("billing-info-container").style.display = "none";
    document.getElementById("finalize-order-container").style.display = "flex";
    let estimatedTime = Math.trunc(Math.random() * 10 + 5);
    document.getElementById("time-completion-estimate").textContent = estimatedTime + " Minutes";
    if (account !== "noaccount") {
        let cart = localStorage.getItem("cart");
        fetch("/order", {
            method: "POST",
            body: estimatedTime + "_" + cart,
        })
    }
}


function registerAnimations() {

}


function generalRating(caller) {
    let rating = genericRatingProcessor(caller);
    caller.parentElement.setAttribute("data-chosenrating", "" + rating);
}


function genericRatingProcessor(caller) {
    let rating = parseInt(caller.getAttribute("data-rating"));

    for (const star of caller.parentElement.children) {
        if (parseInt(star.getAttribute("data-rating")) <= rating) {
            //select
            star.classList.add("rate-selected");
        } else {
            //deselect
            star.classList.remove("rate-selected");
        }
    }

    return rating;
}


function populateItemsForReview() {

    console.log("HI");

    if (document.getElementById("order-review-panel") === null) {
        return;
    }

    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") {
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart"));
    const targetHolder = document.getElementById("order-items-review-container");
    for (const item of cart) {
        let label = item["label"];
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("order-review-tile");

        const labelContainer =  document.createElement("h3");
        labelContainer.textContent = label;
        labelContainer.classList.add("order-review-label");
        itemContainer.appendChild(labelContainer);

        //rating icons
        const iconContainer = document.createElement("div");
        iconContainer.classList.add("rating-container");
        itemContainer.appendChild(iconContainer);
        for (let i = 1; i <= 5; i++) {
            const icon = document.createElement("i");
            iconContainer.appendChild(icon);
            icon.classList.add("fa-solid");icon.classList.add("fa-star");icon.classList.add("rate-star-icon");
            icon.setAttribute("data-rating", "" + i);
            icon.onclick = () => {
                generalRating(icon);
            };
        }

        //input area for the rating
        const inputArea = document.createElement("input");
        itemContainer.appendChild(inputArea);
        inputArea.type = "text";
        inputArea.classList.add("order-item-rating-input");
        inputArea.placeholder = "Short review of the item";

        targetHolder.appendChild(itemContainer);
    }
}


function submitFeedback() {

    let batchRatings = [];

    for (const tile of document.getElementsByClassName("order-review-tile")) {
        let itemName = tile.getElementsByTagName("h3")[0].textContent;
        let ratingStr = tile.getElementsByClassName("rating-container")[0].getAttribute("data-chosenrating");
        let message = tile.getElementsByClassName("order-item-rating-input")[0].value;
        let rating;
        try {
            rating = parseInt(ratingStr);
        } catch (e) {
            continue;
        }
        if (rating > 5 || rating < 1) {
            continue;
        }
        if (message === "") {
            continue;
        }
        //valid rating, send to server.
        let toAdd = {
            "name": itemName,
            "value": rating,
            "message": message
        }
        batchRatings.push(toAdd);
    }

    console.log(batchRatings);


    if (batchRatings.length !== 0) {
        fetch("/addratings", {
            method: "POST",
            body: JSON.stringify({
                "ratings": true,
                "batchedratings": JSON.stringify(batchRatings)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((r) => {
            r.text().then(data => {
                console.log(data);
                document.getElementById("rating-order-header").textContent = "Your Feedback is Appreciated!";
            })
        });
    }


}