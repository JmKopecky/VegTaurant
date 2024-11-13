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
    registerAnimations()

    let cartHeaderNumber = document.getElementById("cart-item-count");
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
        cartHeaderNumber.textContent = JSON.parse(localStorage.getItem("cart")).length;
    } else {
        cartHeaderNumber.textContent = "0";
    }
});


function registerAnimations() {

}


function setAccountPage(target) {
    //animation for navigation
    for (const elem of document.getElementsByClassName("account-nav-listing")) {
        let type = elem.getElementsByTagName("p")[0].textContent;
        if (type === target) {
            elem.classList.add("selected");
        } else {
            elem.classList.remove("selected");
        }
    }

    //animation for panels
    let panel = "panel-" + target.split(" ")[0].toLowerCase();
    for (const elem of document.getElementsByClassName("setting-panel")) {
        if (elem.id === panel) {
            elem.style.display = "flex";
            gsap.to(elem, {
                opacity: "100%",
                ease: "none",
                duration: 0.5
            });
        } else {
            gsap.to(elem, {
                opacity: "0%",
                ease: "none",
                duration: 0.5
            });
            setTimeout(() => {
                elem.style.display = "none";
            }, 0.5);
        }
    }
}