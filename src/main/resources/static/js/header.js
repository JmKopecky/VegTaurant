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


function animateCartChange() {
    const target = document.getElementById("header-cart-icon").getElementsByTagName("svg")[0].getElementsByTagName("circle")[0];

    if (document.getElementById("header-cart-icon").getAttribute("data-activetime") === "active") {
        return;
    }

    document.getElementById("header-cart-icon").setAttribute("data-activetime", "active");
    document.getElementById("header-cart-icon").getElementsByTagName("svg")[0].style.display = "block";
    let pathLength = (target.r.baseVal.value + 1) * 2.0 * Math.PI;
    console.log(pathLength);

    //target strokedasharray of 80
    target.style.strokeDasharray = "" + (pathLength * 2);
    target.style.strokeDashoffset = "" + (pathLength * 2);
    let timeline = gsap.timeline();
    timeline.to(target, {duration: 0.25, strokeDashoffset: pathLength, ease: "power1.linear"});
    timeline.to(target, {duration: 0.25, strokeDasharray: 80, strokeDashoffset: 0, ease: "power1.linear", delay: 0.25});
    timeline.to(target, {duration: 2, strokeDashoffset: pathLength * 2, ease: "power1.linear"});
    timeline.set(target, {strokeDashoffset: 0});
    timeline.to(target, {duration: 0.5, strokeDashoffset: pathLength, strokeDasharray: pathLength * 2, ease: "power1.linear"});
    timeline.to(target, {duration: 0.5, strokeDashoffset: pathLength * 2, ease: "power1.linear"});//timeline.set(target, {strokeDashoffset: 0})
    let acceleration = 2;
    timeline.timeScale(acceleration);
    timeline.play();

    setTimeout(() => {
        document.getElementById("header-cart-icon").setAttribute("data-activetime", "stopped");
    }, 3000 / acceleration);

    setTimeout(() => {
        document.getElementById("header-cart-icon").getElementsByTagName("svg")[0].style.display = "none";
    }, 3500 / acceleration);
}



function headerButtonClick() {
    let headerButton = document.getElementById("header-show-button");
    let isDesktopHeader = true;
    let shouldShow = true;
    let desktopDisplayAttr = "block";

    if (window.matchMedia("(width <= 775px)").matches) {
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