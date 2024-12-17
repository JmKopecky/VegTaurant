


let shiftedItemSpamProtection = false;
function shiftItemPromoCarousel(right) {
    if (shiftedItemSpamProtection) {
        return;
    }

    shiftedItemSpamProtection = true;
    setTimeout(() => {
        shiftedItemSpamProtection = false;
    }, 500);

    const carousel = document.getElementById("item-scroll-container");
    let totalScrollAmount = document.getElementsByClassName("top-rated-item-tile")[0].offsetWidth + window.innerWidth * 3.0/100;// gap = 3vw, tile = 20.25 vw

    if (right) {
        setTimeout(() => {
            gsap.to(carousel, {
                x: 0,
                ease: "none",
                duration: 0.000000001
            });
            const firstChild = carousel.removeChild(carousel.firstElementChild);
            carousel.appendChild(firstChild);
        }, 501);
    } else {
        const lastChild = carousel.removeChild(carousel.lastElementChild);
        carousel.insertBefore(lastChild, carousel.firstChild)
        gsap.to(carousel, {
            x: -totalScrollAmount,
            ease: "linear",
            duration: 0.0000001
        });
    }

    if (right) {
        gsap.to(carousel, {
            x: -totalScrollAmount,
            ease: "power1.inout",
            duration: 0.5
        });
    } else {
        gsap.to(carousel, {
            x: 0,
            ease: "power1.inout",
            duration: 0.5
        });
    }
}


function initHome() {
    registerAnimations();
}


function registerAnimations() {

    for (const elem of document.getElementsByClassName("approaches-tile")) {
        elem.addEventListener("mouseover", () => {
            //show
            toggleApproachesTile(elem, "show");
            elem.setAttribute("data-mouseover", "true");
        });
        elem.addEventListener("mouseout", () => {
            //hide
            elem.setAttribute("data-mouseover", "false");
            if (elem.getAttribute("data-approaches-tile-selected") !== "true") {
                toggleApproachesTile(elem, "hide");
            }
        });
        elem.addEventListener("click", () => {
            if (elem.getAttribute("data-approaches-tile-selected") === "true") {
                elem.setAttribute("data-approaches-tile-selected", "false");
                toggleApproachesTile(elem, "hide");
            } else {
                elem.setAttribute("data-approaches-tile-selected", "true");
                toggleApproachesTile(elem, "show");
            }
        });
    }

    let targets = [];
    targets.push(document.getElementById("item-promo-header"));
    targets.push(document.getElementById("item-scroll-area"));
    targets.push(document.getElementById("featured-overlay"));
    targets.push(document.getElementById("discount-header"));
    targets.push(document.getElementById("discount-body"));
    if (document.getElementById("discount-button") !== null) {
        targets.push(document.getElementById("discount-button"));
    }
    targets.push(document.getElementById("top-ratings-header"));
    for (const e of document.getElementsByClassName("rating-tile")) {targets.push(e)}
    targets.push(document.getElementById("member-benefit-promo"));
    targets.push(document.getElementById("approaches-header"));


    for (const elem of targets) {
        gsap.set(elem, {opacity:0, y:window.innerHeight / 5});
        gsap.to(elem, {opacity: 1, y: 0, duration: 0.5, ease: "power1.inout", scrollTrigger:{trigger: elem, start: "top 90%", scrub:1, end: "top 70%"}});
    }


    gsap.set(document.getElementById("collaborate-info-text"), {opacity: 0, x: -1 * document.getElementById("collaborate-info-text").getBoundingClientRect().left - document.getElementById("collaborate-info-text").getBoundingClientRect().width});
    gsap.set(document.getElementById("collaborate-info-image"), {opacity: 0, x: document.getElementById("collaborate-info-image").getBoundingClientRect().width})
    gsap.set(document.getElementById("collaborate-header"), {opacity:0, y:window.innerHeight / 5});
    gsap.to(document.getElementById("collaborate-header"), {opacity: 1, y: 0, duration: 0.5, ease: "power1.inout", delay: 0.5, scrollTrigger:{trigger: document.getElementById("collaborate-header"), start: "top 90%", scrub:1, end: "top 70%"}});
    gsap.to(document.getElementById("collaborate-info-text"), {
        x: 0, opacity: 1, duration: 0.5, ease: "power1.inout", scrollTrigger:{
            trigger: document.getElementById("collaborate-header"),start:"top 90%", scrub:1, end: "top 70%"}
    });

    gsap.to(document.getElementById("collaborate-info-image"), {
        x: 0, opacity: 1, duration: 0.5, ease: "power1.inout", scrollTrigger:{
            trigger: document.getElementById("collaborate-header"),start:"top 90%", scrub:1, end: "top 70%"}
    });

    gsap.set(document.getElementsByClassName("approaches-tile"), {y:window.innerHeight / 5, opacity:0});
    gsap.to(document.getElementsByClassName("approaches-tile"), {
        y: 0, opacity: 1, duration: 0.5, ease: "power1.inout", delay: 0.5, stagger:0.1, scrollTrigger:{
            trigger: document.getElementById("approaches-header"), start:"top 90%", scrub:1, end: "top 70%"}});
}

function toggleApproachesTile(tile, mode) {
    if (mode === "show") {
        //swap content and header
        //change background color
        gsap.to(tile, {
            backgroundColor: "rgba(0, 184, 55, 1)",
            ease: "power1.out",
            duration: 0.5
        });
        gsap.to(tile.getElementsByClassName("approaches-tile-heading")[0], {
            opacity: 0,
            ease: "linear",
            duration: 0.25
        });
        setTimeout(() => {
            tile.getElementsByClassName("approaches-tile-heading")[0].style.display = "none";
            tile.getElementsByClassName("approaches-tile-content")[0].style.display = "block";
            gsap.to(tile.getElementsByClassName("approaches-tile-content")[0], {
                opacity: 1,
                ease: "linear",
                duration: 0.25
            });
        }, 250);
    } else {
        gsap.to(tile, {
            backgroundColor: "rgba(0, 184, 55, 0)",
            ease: "power1.out",
            duration: 0.5
        });
        gsap.to(tile.getElementsByClassName("approaches-tile-content")[0], {
            opacity: 0,
            ease: "linear",
            duration: 0.25
        });
        setTimeout(() => {
            tile.getElementsByClassName("approaches-tile-content")[0].style.display = "none";
            tile.getElementsByClassName("approaches-tile-heading")[0].style.display = "block";
            gsap.to(tile.getElementsByClassName("approaches-tile-heading")[0], {
                opacity: 1,
                ease: "linear",
                duration: 0.25
            });
        }, 250);

    }
}