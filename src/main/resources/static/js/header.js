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


function prepareHeaderAnim() {
    gsap.set(document.getElementById("header-container"), {x: document.getElementById("header-container").getBoundingClientRect().width});
    gsap.set(document.getElementById("branding-container"), {x: -1 * document.getElementById("branding-container").getBoundingClientRect().left - document.getElementById("branding-container").getBoundingClientRect().width});
}


function headerIntroAnim() {
    gsap.to(document.getElementById("header-container"), {x: 0, duration: 0.5, ease: "power1.inout"});
    gsap.to(document.getElementById("branding-container"), {x: 0, duration: 0.5, ease: "power1.inout"});
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


    const cartIcon = document.getElementById("header-cart-icon");
    cartIcon.addEventListener("mouseenter", () => {
        iconHoverSvg("enter", cartIcon);
    });
    cartIcon.addEventListener("mouseleave", () => {
        iconHoverSvg("leave", cartIcon);
    });
    const accountIcon = document.getElementById("header-account-icon");
    accountIcon.addEventListener("mouseenter", () => {
        iconHoverSvg("enter", accountIcon);
    });
    accountIcon.addEventListener("mouseleave", () => {
        iconHoverSvg("leave", accountIcon);
    });
});



function iconHoverSvg(mode, target) {
    let targetElem = target.getElementsByTagName("svg")[0].getElementsByTagName("circle")[0];
    let targetIcon;
    if (target.id === "header-cart-icon") {
        targetIcon = target.getElementsByTagName("i")[0];
    } else {
        targetIcon = target.getElementsByTagName("img")[0];
    }
    let pathLength = (targetElem.r.baseVal.value + 1) * 2.0 * Math.PI;
    if (mode === "enter") {
        if (target.getAttribute("data-hover") === "false") {
            target.setAttribute("data-hover", "true");
            target.getElementsByTagName("svg")[0].style.display = "block";

            gsap.to(targetIcon, {scale: 0.75, duration: 0.5, ease: "power1.inout"});

            targetElem.style.strokeDasharray = "" + (pathLength * 2);
            targetElem.style.strokeDashoffset = "" + (pathLength * 2);

            gsap.to(targetElem, {duration: 0.5, strokeDashoffset: pathLength, ease: "power1.inout"});

            setTimeout(() => {
                if (target.getAttribute("data-hide") === "true") {
                    target.setAttribute("data-hide", "false");
                    gsap.to(targetElem, {duration: 0.5, strokeDashoffset: pathLength * 2, ease: "power1.linear"});
                    gsap.to(targetIcon, {scale: 1, duration: 0.5, ease: "power1.inout"});
                    setTimeout(() => {
                        target.getElementsByTagName("svg")[0].style.display = "none";
                    }, 500);
                } else {
                    target.setAttribute("data-hide", "true");
                }
            }, 500);
        }
    } else {
        if (target.getAttribute("data-hover") === "true") {
            target.setAttribute("data-hover", "false");

            if (target.getAttribute("data-hide") === "true") {
                gsap.to(targetElem, {duration: 0.5, strokeDashoffset: pathLength * 2, ease: "power1.linear"});
                gsap.to(targetIcon, {scale: 1, duration: 0.5, ease: "power1.inout"});
                setTimeout(() => {
                    target.getElementsByTagName("svg")[0].style.display = "false";
                }, 500);
                target.setAttribute("data-hide", "false");
            } else {
                target.setAttribute("data-hide", "true");
            }
        }
    }
}


function animateCartChange() {
    const target = document.getElementById("header-cart-icon").getElementsByTagName("svg")[0].getElementsByTagName("circle")[0];

    if (document.getElementById("header-cart-icon").getAttribute("data-activetime") === "active") {
        return;
    }

    document.getElementById("header-cart-icon").setAttribute("data-activetime", "active");
    document.getElementById("header-cart-icon").getElementsByTagName("svg")[0].style.display = "block";
    let pathLength = (target.r.baseVal.value + 1) * 2.0 * Math.PI;

    //target strokedasharray of 80
    target.style.strokeDasharray = "" + (pathLength * 2);
    target.style.strokeDashoffset = "" + (pathLength * 2);
    let timeline = gsap.timeline();
    timeline.to(target, {duration: 0.5, strokeDashoffset: pathLength, ease: "power1.linear"});
    timeline.to(target, {duration: 0.5, strokeDashoffset: pathLength * 2, ease: "power1.linear", delay: 0.25});//timeline.set(target, {strokeDashoffset: 0})
    let acceleration = 1;
    timeline.timeScale(acceleration);
    timeline.play();

    setTimeout(() => {
        document.getElementById("header-cart-icon").setAttribute("data-activetime", "stopped");
    }, 750 / acceleration);

    setTimeout(() => {
        document.getElementById("header-cart-icon").getElementsByTagName("svg")[0].style.display = "none";
    }, 1250 / acceleration);
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

        let preAnimate = document.getElementById("header-link-container").getElementsByTagName("a");
        let toAnimate = [];
        for (const elem of preAnimate) {
            if (!elem.classList.contains("header-no-remove")) {
                toAnimate.push(elem);
            }
        }
        toAnimate.reverse();

        if (desktopDisplayAttr === "block") {

            gsap.set(toAnimate, {
                display: desktopDisplayAttr,
                stagger: 0.1
            })

            gsap.from(toAnimate, {
                opacity: 0,
                x: "100%",
                duration: 0.5,
                ease: "power1.inout",
                stagger: 0.1
            });
        } else {

            toAnimate.reverse();
            gsap.to(toAnimate, {
                opacity: 0,
                x: "100%",
                duration: 0.5,
                ease: "power1.inout",
                stagger:{
                    each: 0.1,
                    onComplete() {
                        this.targets()[0].setAttribute("style", "display:" + desktopDisplayAttr + ";");
                    }
                }
            });
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