const lenis = new Lenis({
    syncTouch: true,
    duration: 1.5
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


document.addEventListener("DOMContentLoaded", (event) => {
    registerAnimations()

    setMenuCategory("All");
});


function registerAnimations() {

}




function setMenuCategory(targetCategory) {
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


function retrieveItemData(itemLabel) {
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