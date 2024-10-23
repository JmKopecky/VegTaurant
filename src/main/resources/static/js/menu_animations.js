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