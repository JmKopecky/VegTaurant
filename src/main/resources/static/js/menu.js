function initMenu() {
    setMenuCategory("All");
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