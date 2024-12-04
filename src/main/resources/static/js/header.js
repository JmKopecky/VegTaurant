if (window.matchMedia("(pointer:fine)").matches) {
    const lenis = new Lenis({
        syncTouch: true,
        duration: 1.5
    })
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
}


document.addEventListener("DOMContentLoaded", (event) => {
    registerAnimations()

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
});



function headerButtonClick() {
    let headerButton = document.getElementById("header-show-button");
    let isDesktopHeader = true;
    let shouldShow = true;
    let desktopDisplayAttr = "block";

    if (window.matchMedia("(width <= 675px)").matches) {
        isDesktopHeader = false;
    }

    if (headerButton.getAttribute("data-headeropen") === "true") {
        shouldShow = false;
        headerButton.setAttribute("data-headeropen", "false");
    } else {
        shouldShow = true;
        headerButton.setAttribute("data-headeropen", "true");
    }

    if (shouldShow) {
        desktopDisplayAttr = "block";
    } else {
        desktopDisplayAttr = "none";
    }

    if (isDesktopHeader) {
        for (const link of document.getElementById("header-link-container").getElementsByTagName("a")) {
            if (!link.classList.contains("header-no-remove")) {
                link.setAttribute("style", "display:" + desktopDisplayAttr + ";");
            }
        }
    } else {
        //mobile
        const mobileHeaderContainer = document.getElementById("mobile-header-popup");
        if (shouldShow) {
            mobileHeaderContainer.style.display = "flex";
        } else {
            mobileHeaderContainer.style.display = "none";
        }
    }
}