const lenis = new Lenis({
    syncTouch: true,
    duration: 1.5
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


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
    let totalScrollAmount = 0.2325 * window.innerWidth;// gap = 3vw, tile = 20.25 vw

    if (right) {
        setTimeout(() => {
            gsap.to(carousel, {
                x: 0,
                ease: "none",
                duration: 0.000001
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
            duration: 0.000001
        });
    }

    if (right) {
        gsap.to(carousel, {
            x: -totalScrollAmount,
            ease: "linear",
            duration: 0.5
        });
    } else {
        gsap.to(carousel, {
            x: 0,
            ease: "linear",
            duration: 0.5
        });
    }
}


document.addEventListener("DOMContentLoaded", (event) => {
    registerAnimations()
});


function registerAnimations() {

}