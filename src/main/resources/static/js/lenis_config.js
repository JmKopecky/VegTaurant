const lenis = new Lenis()
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

    const siteContentScrollContainer = document.getElementById("site-content");

    let totalScrollAmount = siteContentScrollContainer.scrollWidth - document.documentElement.clientWidth;// - (0.525 * window.innerWidth);
    horizontalScroll = gsap.to(siteContentScrollContainer, {
        x: -totalScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: "#site-content",
            start: "top " + -1,
            end: "+=" + totalScrollAmount,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true
        }
    });
}


function registerAnimations() {
    gsap.registerPlugin(ScrollTrigger)
    //menu title fade and slide in.
    const menuTitle = document.getElementById("menu-title");
    //TODO
    gsap.from(menuTitle, {
        x: -300,
        duration: 5,
        //ease: "elastic",
        scrollTrigger: {
            trigger: menuTitle,
            containerAnimation: horizontalScroll,
            start: "center center",
        }
    });
}