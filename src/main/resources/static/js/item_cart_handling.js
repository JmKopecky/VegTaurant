function hideOverlay(event, element) {

    if (event !== null && event.target !== element) {
        event.stopPropagation();
        return;
    }
    const count = document.getElementById("item-count-input");
    count.style.color = document.getElementById("item-count-label").style.color;
    setTimeout(() => {
        count.value = 1;
    }, 0);
    document.getElementById("menu-item-overlay").setAttribute("style", "display: none;");
}


function retrieveItemData(itemLabel) { //feature item customization? Not really important. Maybe notes instead?
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
    let count = document.getElementById("item-count-input").value;
    if (count <= 0) {
        document.getElementById("item-count-input").style.color = "red";
        return;
    } else {
        document.getElementById("item-count-input").style.color = document.getElementById("item-count-label").style.color;
    }
    let item = {
        "label": label,
        "price": price,
        "count": count
    }

    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "unset") {
        //create cart.
        let cart = [item];
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        //add to cart.
        let cart = JSON.parse(localStorage.getItem("cart"));
        let newCart = [];
        let duplicates = false;
        for (const target of cart) {
            if (target["label"] === item["label"]) {
                duplicates = true;
                item["count"] = parseInt(target["count"]) + parseInt(item["count"]);
                newCart.push(item);
            } else {
                newCart.push(target);
            }
        }
        if (!duplicates) {
            newCart.push(item);
        }
        localStorage.setItem("cart", JSON.stringify(newCart));
        console.log(newCart);
    }

    //hide overlay
    hideOverlay(null, null);

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