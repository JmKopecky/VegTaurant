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
    registerScroll();
    registerAnimations();
});

let horizontalScroll;


function registerScroll() {
    gsap.registerPlugin(ScrollTrigger)

    const scrollContainer = document.getElementById("menu-categories-container");

    let totalScrollAmount = scrollContainer.scrollWidth - document.documentElement.clientWidth * (1-0.27);// - (0.525 * window.innerWidth);
    horizontalScroll = gsap.to(scrollContainer, {
        x: -totalScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: "#menu-categories-container",
            start: "top " + -1,
            end: "+=" + totalScrollAmount,
            pin: true,
            scrub: true,
            normalize: true
        }
    });
}

function registerAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    //header
    gsap.from("#header-container", {
        duration: 2,
        x: -200,
        opacity: 0,
        ease: "power1.inout",
    })
}